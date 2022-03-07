
import { observable, action } from "mobx"

import krMsg from "./strings/kr.json";
import enMsg from "./strings/en.json";

const messages = {ko: krMsg,  "en": enMsg};

const LocaleStore = observable({

    locale : 'en',
    message :  messages['en'],

    setLocale(locale){
        if(this.locale == locale){
            return;
        }
        console.log("setLocale locale = "+locale)
        this.message =  messages[locale];
        console.log("setLocale message = "+JSON.stringify(this.message))
        this.locale = locale;
    }

});

export default LocaleStore;