
import { observable, action } from "mobx"
import { act } from "react-test-renderer";

const MobXStore=()=>{
    @observable locale = '';
 
    @action setLocale = (localeValue) =>{
        locale = localeValue;
    }
}
const mobxStore = MobXStore();
export default mobxStore;