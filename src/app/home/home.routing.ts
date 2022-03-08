import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const countriesRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
    {
		path: 'home',
		component: HomeComponent,
	},
];
