import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App level services
import { EAMusicFestivalService } from './EAMusicFestival.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class ServiceModule {
  // forRoot allows to override providers
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        EAMusicFestivalService
      ]
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
    if (parentModule) {
      throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
    }
  }
}
