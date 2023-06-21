// import { useEffect } from "react";

// import { useSelector } from "react-redux";
// import { RootState } from "../RTKstore";
// import {
//   IonButton,
//   IonCard,
//   IonCardContent,
//   IonCardHeader,
//   IonCardSubtitle,
//   IonCardTitle,
//   IonCol,
//   IonContent,
//   IonGrid,
//   IonHeader,
//   IonItem,
//   IonLabel,
//   IonPage,
//   IonRow,
//   IonTitle,
//   IonToolbar,
//   IonicSlides,
// } from "@ionic/react";
// import { useGetTenantQuery } from "../api/tenantAPI";
// import { routes } from "../routes";
// import CommonHeader from "../components/CommonHeader";
// import { Autoplay } from "swiper";
// import "swiper/css";
// import "swiper/css/autoplay";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// import serverURL from "../ServerDomain";
// import { TenantListOutput } from "../types";
// import { format, parseISO } from "date-fns";
// import { useGetTenantsQuery } from "../api/loginMutation";

// export function TenantPage() {
//   const {
//     data,
//     isFetching,
//     isLoading,
//     error: fetchError,
//     isError,
//   } = useGetTenantsQuery({});
//   const error = fetchError || data?.error;

//   return (
//     <IonPage>
//       <CommonHeader title="Tenant List" backUrl={routes.home} />
//       <IonContent>
//         {isError ? (
//           <>error: {String(error)}</>
//         ) : isLoading ? (
//           <>loading</>
//         ) : isFetching ? (
//           <>Fetching</>
//         ) : !data ? (
//           <>no data??</>
//         ) : data.length == 0 ? (
//           <>no tenant yet</>
//         ) : data.length > 0 ? (
//           data.map((tenant: TenantListOutput) => (
//             <IonCard key={tenant.id}>
//               <IonCardHeader>
//                 <IonRow>
//                   <IonCol className="tenantListTitle">
//                     Tenant:{" "}
//                     {tenant.first_name && tenant.last_name
//                       ? tenant.first_name + " " + tenant.last_name
//                       : " No tenant yet"}
//                   </IonCol>
//                 </IonRow>
//                 <IonRow>
//                   <IonCol>

//                   </IonCol>
//                   <IonCol>

//                   </IonCol>
//                 </IonRow>
//               </IonCardHeader>

//               <IonCardContent></IonCardContent>

//             </IonCard>
//           ))
//         ) : (
//           <>Invalid Data: {JSON.stringify(data)}</>
//         )}
//       </IonContent>
//     </IonPage>
//   );
// }
