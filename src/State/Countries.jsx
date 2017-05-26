import { observable } from 'mobx';

class CountriesStore {
    @observable countryList = [];
}

export const countriesStore = new CountriesStore();
