import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {WinsComponent} from "./wins/wins.component";
import {LosesComponent} from "./loses/loses.component";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {StatisticComponent} from "./statistic/statistic.component";

const routes: Routes = [
  {path: "gameconsole", component: AppComponent},
  {path: "statistic", component: StatisticComponent},
  {path: "wins", component: WinsComponent},
  {path: "loses", component: LosesComponent},
  {path: "", component: LandingpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
