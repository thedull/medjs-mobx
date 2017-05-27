import { computed, observable } from 'mobx';

class CountriesStore {
    @observable countryList = [];
    @observable selectedCountry = {};
    @computed get totalCountries() {
        return this.countryList.length;
    }
}

export const countriesStore = new CountriesStore();
