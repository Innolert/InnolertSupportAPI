/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import endUser from '../api/endUser/endUser.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });



  endUser.find({}).remove()
    .then(() => {
      endUser.create(  {
    "_id": "570c9d41cabc11b20426066f",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570c9d41cabc11b204260670",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T07:01:21.732Z",
    "active": true
  },
  {
    "_id": "570ccb12cabc11b204260685",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570ccb12cabc11b204260686",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T10:16:50.131Z",
    "active": true
  },
  {
    "_id": "570ccc93cabc11b204260688",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570ccc93cabc11b204260689",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T10:23:15.119Z",
    "active": true
  },
  {
    "_id": "570cd183cabc11b20426068b",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cd183cabc11b20426068c",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T10:44:19.757Z",
    "active": true
  },
  {
    "_id": "570cdadacabc11b204260692",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cdadacabc11b204260693",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T11:24:10.174Z",
    "active": true
  },
  {
    "_id": "570cdb9ecabc11b204260694",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cdb9ecabc11b204260695",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T11:27:26.364Z",
    "active": true
  },
  {
    "_id": "570b8519cabc11b204260647",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b8519cabc11b204260648",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T11:06:01.647Z",
    "active": true
  },
  {
    "_id": "570b8c25cabc11b204260649",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b8c25cabc11b20426064a",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T11:36:05.794Z",
    "active": true
  },
  {
    "_id": "570b974bcabc11b20426064f",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b974bcabc11b204260650",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T12:23:39.472Z",
    "active": true
  },
  {
    "_id": "570b9818cabc11b204260651",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b9818cabc11b204260652",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T12:27:04.752Z",
    "active": true
  },
  {
    "_id": "570b9966cabc11b204260654",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b9966cabc11b204260655",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T12:32:38.511Z",
    "active": true
  },
  {
    "_id": "570b99d9cabc11b204260656",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b99d9cabc11b204260657",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T12:34:33.300Z",
    "active": true
  },
  {
    "_id": "570b9a5fcabc11b204260658",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b9a5fcabc11b204260659",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T12:36:47.775Z",
    "active": true
  },
  {
    "_id": "570b9ae4cabc11b20426065a",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570b9ae4cabc11b20426065b",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T12:39:00.631Z",
    "active": true
  },
  {
    "_id": "570bb10dcabc11b20426065d",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570bb10dcabc11b20426065e",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T14:13:33.540Z",
    "active": true
  },
  {
    "_id": "570bb22acabc11b204260660",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570bb22acabc11b204260661",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-11T14:18:18.544Z",
    "active": true
  },
  {
    "_id": "570c906ecabc11b204260665",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570c906ecabc11b204260666",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T06:06:38.530Z",
    "active": true
  },
  {
    "_id": "570c9207cabc11b204260667",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570c9207cabc11b204260668",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T06:13:27.838Z",
    "active": true
  },
  {
    "_id": "570c9b20cabc11b20426066b",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570c9b20cabc11b20426066c",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T06:52:16.652Z",
    "active": true
  },
  {
    "_id": "570c9bedcabc11b20426066d",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570c9bedcabc11b20426066e",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T06:55:41.742Z",
    "active": true
  },
  {
    "_id": "570ce063cabc11b20426069e",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570ce063cabc11b20426069f",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T11:47:47.801Z",
    "active": true
  },
  {
    "_id": "570ce1becabc11b2042606a1",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570ce1becabc11b2042606a2",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T11:53:34.358Z",
    "active": true
  },
  {
    "_id": "570ce300cabc11b2042606a3",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570ce300cabc11b2042606a4",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T11:58:56.187Z",
    "active": true
  },
  {
    "_id": "570cea74cabc11b2042606a5",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cea74cabc11b2042606a6",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T12:30:44.335Z",
    "active": true
  },
  {
    "_id": "570ceaffcabc11b2042606a8",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570ceaffcabc11b2042606a9",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T12:33:03.327Z",
    "active": true
  },
  {
    "_id": "570ceb89cabc11b2042606aa",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570ceb89cabc11b2042606ab",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T12:35:21.416Z",
    "active": true
  },
  {
    "_id": "570cf31dcabc11b2042606ac",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cf31dcabc11b2042606ad",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T13:07:41.188Z",
    "active": true
  },
  {
    "_id": "570cf3e1cabc11b2042606ae",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cf3e1cabc11b2042606af",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T13:10:57.310Z",
    "active": true
  },
  {
    "_id": "570cf8d3cabc11b2042606b0",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cf8d3cabc11b2042606b1",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T13:32:03.041Z",
    "active": true
  },
  {
    "_id": "570cfb69ee99221614dbf8d0",
    "mobileNumber": "mobileNumber",
    "__v": 0,
    "device": [
      {
        "brand": "LGE Nexus 5",
        "id": "fbc3c5339fea4b1f",
        "imei": "352136063425306",
        "_id": "570cfb69ee99221614dbf8d1",
        "permissions": [
          "android.permission.WAKE_LOCK",
          "com.google.android.c2dm.permission.RECEIVE",
          "innolert.kipmiservice.permission.C2D_MESSAGE",
          "android.permission.INTERNET",
          "android.permission.READ_PHONE_STATE",
          "android.permission.BLUETOOTH",
          "android.permission.BLUETOOTH_ADMIN",
          "android.permission.ACCESS_WIFI_STATE",
          "android.permission.CHANGE_WIFI_STATE",
          "android.permission.PROCESS_OUTGOING_CALLS",
          "android.permission.WRITE_EXTERNAL_STORAGE",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.READ_CALL_LOG",
          "android.permission.ACCESS_NETWORK_STATE"
        ]
      }
    ],
    "email": [
      "[]"
    ],
    "createdAt": "2016-04-12T13:43:05.553Z",
    "active": true
  })
      .then(() => {
        console.log('finished populating users');
      });
    });
