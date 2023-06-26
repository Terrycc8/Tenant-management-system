import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import {
  PropertyListOutput,
  SearchTenantOutput,
  TenantListOutput,
} from "../types";
import { useCallback, useEffect, useState } from "react";
import {
  closeCircle,
  closeCircleOutline,
  closeOutline,
  personCircle,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { apiRoutes } from "../routes";
import serverURL from "../ServerDomain";
import { showResponseMessage } from "../helper";
import style from "../theme/searchTenant.module.scss";
export function CustomSelector(props: {
  readonly?: boolean;
  defaultValue?: string;
  value: string[][];
  title: string;
  name: string;
}) {
  const { value, title, name } = props;
  return (
    <IonCol>
      <IonSelect
        label={title}
        labelPlacement="floating"
        fill="outline"
        name={name}
        value={props.defaultValue || ""}
      >
        {value.map((item, idx) => (
          <IonSelectOption
            disabled={props.readonly || false}
            value={item[0]}
            key={idx + 1}
          >
            {item[1]}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonCol>
  );
}

export function CustomSelectorOnFetch(props: {
  value: PropertyListOutput[];
  title: string;
  name: string;
}) {
  const { value, title, name } = props;
  return (
    <IonSelect
      label={title}
      labelPlacement="floating"
      fill="outline"
      name={name}
    >
      {!value || value.length == 0 ? (
        <IonSelectOption disabled={true}>
          <IonLabel>No Associated {props.title}.</IonLabel>
        </IonSelectOption>
      ) : value.length > 0 ? (
        value.map((item) => (
          <IonSelectOption value={item.id} key={item.id}>
            {item.title}
          </IonSelectOption>
        ))
      ) : (
        <>Invalid Data: {JSON.stringify(value)}</>
      )}
    </IonSelect>
  );
}
export function CustomSelectorOnFetchTenant(props: {
  cb: (id: number) => void;
}) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchTenantOutput[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const fetchResultOnInput = useCallback(
    (e: CustomEvent) => {
      fetch(serverURL + apiRoutes.allTenants + `/?search=${e.detail.value}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          let json: SearchTenantOutput[] = await res.json();
          setSearchResult(json);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [serverURL, apiRoutes, token]
  );
  const closeBtnOnlick = useCallback(() => {
    setSearchText("");
    setShowSearch(false);
  }, []);
  const ionInputOnput = useCallback(() => {
    setShowSearch(true);
  }, []);
  const searchBarOnClear = useCallback(() => {
    setSearchText("");
  }, []);

  return (
    <>
      <IonInput
        onClick={ionInputOnput}
        placeholder="Click here to search tenants"
        value={selectedResult}
        name="tenant_id"
      ></IonInput>
      <IonModal isOpen={showSearch}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Search Tenant</IonTitle>
            <IonButtons onClick={closeBtnOnlick} slot="start">
              <IonButton>
                <IonIcon icon={closeOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar
            onIonInput={fetchResultOnInput}
            placeholder="Search by tenant's name or email"
            onIonClear={searchBarOnClear}
          ></IonSearchbar>

          <IonList>
            <IonButtons className={style.contactsBtnGroup}>
              {searchResult.map((result) => (
                <IonItem key={result.tenant_id}>
                  <IonButton
                    data-id={result.tenant_id}
                    onClick={() => {
                      setShowSearch(false);
                      setSelectedResult(result.first_name + result.last_name);

                      props.cb(result.tenant_id);
                    }}
                  >
                    {typeof result.avatar == "string" &&
                    result.avatar.length > 0 ? (
                      <IonAvatar className={style.avatar}>
                        <img
                          src={serverURL + "/" + result.avatar}
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                              serverURL + "/defaultProfilePic.png";
                          }}
                        />
                      </IonAvatar>
                    ) : (
                      <IonIcon
                        slot="icon-only"
                        icon={personCircle}
                        className={style.avatar}
                      ></IonIcon>
                    )}
                    <IonLabel className="ion-margin">
                      {result.first_name} {result.last_name}
                    </IonLabel>
                  </IonButton>
                </IonItem>
              ))}
            </IonButtons>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
}
