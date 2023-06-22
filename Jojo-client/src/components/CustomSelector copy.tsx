import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PropertyListOutput, TenantListOutput } from "../types";
import { useState } from "react";

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
    <IonCol>
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
    </IonCol>
  );
}
export function CustomSelectorOnFetchTenant(props: {
  value: TenantListOutput[];
  title: string;
  name: string;
}) {
  let [results, setResults] = useState([...props.value]);
  const { value, title, name } = props;
  const handleInput = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(
      props.value.filter((d: TenantListOutput) => {
        if (d.first_name.includes(query) || d.last_name.includes(query)) {
          return false;
        } else return true;
      })
    );
  };

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tenantId, setTenantId] = useState(0);

  return (
    <IonCol>
      <IonModal isOpen={showSearch}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Search Tenant</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setSearchText("");
                  setShowSearch(false);
                }}
              >
                Dismiss
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value || "")}
            onIonClear={() => setSearchText("")}
          ></IonSearchbar>

          <IonList>
            {results
              .filter(
                (result) =>
                  result.first_name?.includes(searchText) ||
                  result.last_name?.includes(searchText) ||
                  result.email?.includes(searchText) ||
                  result.title?.includes(searchText)
              )
              .map((result) => (
                <IonItem
                  key={result.tenant_id}
                  onClick={() => {
                    setShowSearch(false);
                    setTenantId(result.tenant_id);
                  }}
                >
                  <IonLabel>
                    {result.last_name} {result.first_name}
                  </IonLabel>
                </IonItem>
              ))}
          </IonList>
        </IonContent>
      </IonModal>
      <IonSelect
        value={tenantId}
        onClick={(event) => {
          // alert("123");
          // event.preventDefault();
          // event.stopPropagation();
          // setShowSearch(!showSearch);
        }}
        // disabled
        label={title}
        labelPlacement="floating"
        fill="outline"
        name={name}
      >
        <IonSelectOption value={0}>No Associated {props.title}</IonSelectOption>
        {value.map((item) => (
          <IonSelectOption value={item.tenant_id} key={item.tenant_id}>
            {item.first_name} {item.last_name}
          </IonSelectOption>
        ))}
      </IonSelect>
      <IonSearchbar
        onClick={() => setShowSearch(!showSearch)}
        placeholder="Search Tenant by name"
      ></IonSearchbar>
    </IonCol>
  );
}
