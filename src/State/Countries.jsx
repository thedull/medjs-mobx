import { observable, computed } from 'mobx';

class CountriesStore {
    @observable countryList = [];
    @observable selectedCountry = {};
    @computed get totalCountries() {
        return this.countryList.length;
    }
}

export const countries = new CountriesStore();
