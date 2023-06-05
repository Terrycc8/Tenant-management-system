function AppRounter(){
    return  <IonRouterOutlet>
    <Route path="/login">
    <Tab1 />
    </Route>
    <Route  path="/tab2">
      <Tab2 />
    </Route>
    <Route path="/tab3">
      <Tab3 />
    </Route>
    <Route path="/">
      <Redirect to="/tab1" />
    </Route>
  </IonRouterOutlet>
}