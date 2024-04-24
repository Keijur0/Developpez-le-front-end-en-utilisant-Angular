import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { PieChartComponent } from './core/components/pie-chart/pie-chart.component';
import { InfoBoxComponent } from './core/components/info-box/info-box.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { LineChartComponent } from './core/components/line-chart/line-chart.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponent, InfoBoxComponent, CountryDetailsComponent, LineChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
