import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SharedModule} from './shared/shared.module';

import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalRedirectComponent,
  MsalGuardConfiguration, MsalInterceptorConfiguration, MSAL_INTERCEPTOR_CONFIG, MSAL_GUARD_CONFIG, MSAL_INSTANCE
} from "@azure/msal-angular";
import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  IPublicClientApplication
} from "@azure/msal-browser";

import { environment } from '../environments/environment';


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.AzureAd.clientId,
      authority: environment.AzureAd.authority,
      redirectUri: environment.AzureAd.redirectUri,
      knownAuthorities: [environment.AzureAd.knownAuthorities]
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: true, // set to true for IE 11
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.URL+'/*', ['https://login.tkov.dev/c8fc6146-82a2-4427-aa8a-2424a4f768e3/API.Default']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['https://login.tkov.dev/c8fc6146-82a2-4427-aa8a-2424a4f768e3/API.Default']
    }
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    AuthService,
    MsalService,
    MsalGuard,
    MsalBroadcastService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {}

