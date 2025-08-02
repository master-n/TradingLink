import state from '/src/store/store';
import Swal from "sweetalert2";
import {serverTimestamp} from "firebase/database";
import store from "../store/store";

export const useBearerTokenHeaders = (hasFile= false) => {

    const userInfo = state.getters.GET_USER_INFO;

    if(Object.keys(userInfo).length !== 0){

        let mHeaders = {
            Authorization: 'Bearer ' + userInfo.access_token,
        }

        if(hasFile){
            mHeaders['content-type'] = 'multipart/form-data'
        }

        return {
            headers: mHeaders
        }
    }
    else return  {}

}

export const useBasicAuthHeaders = () => {

    const username = process.env.VUE_APP_CLIENT_ID;
    const password = process.env.VUE_APP_CLIENT_SECRET;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    return {
        headers: {
            Authorization: basicAuth
        }

    }
}


export const chatItem = (message, recipientId, recipientName, type, payload) => {

 const admin = store.getters.GET_USER_INFO

  return   {
        'message': message,
        'senderId': admin.id,
        'senderName': admin.name,
        'recipientId': recipientId,
        'recipientName': recipientName,
        'sentBy': 'admin',
        'sentTo': 'driver',
        'hasFile': false,
        'filePath': '',
        'sentAt': serverTimestamp(),
        'read': false,
        'type': type,
        'payload': payload || ""
    }
}

export const chatUserItem = (driver, chatType) => {
    const otherNames = driver['other_names'] || '';
  return   {
      'name': driver.name + " " + otherNames,
      'lastMessage': "",
      'lastMessageTime': serverTimestamp(),
      'id': driver.id,
      'phone': driver['phone'],
      'status': 'offline',
      'chatType': chatType,
      "pendingSupportMessagesForAdmin": 0,
      "pendingReceiptMessagesForAdmin": 0,
      "pendingSupportMessagesForDriver": 0,
      "pendingReceiptMessagesForDriver": 0,
  }
}

export const  confirm = (message, callback) => {
    Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm!",
    }).then((result) => {
        if (result.value) {
            callback(result.value)
        }
    });
}

export const showToast = (context, message, variant = 'primary') => {
    context.$bvToast.toast(message, {
        variant: variant,
        toaster: 'b-toaster-bottom-center',
        solid: true
    })
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getBackEndUrl = () => {
    return process.env.VUE_APP_ENV === 'local' ?
        process.env.VUE_APP_API_LOCAL_BASE_URL : process.env.VUE_APP_API_PROD_BASE_URL;
}