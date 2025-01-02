(function () {
  // copyright console
  // 取得瀏覽器完整的版本資訊.轉成小寫.判斷字串() > -1(找不到)
  if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    var a = ["\n\n %c Developed by Bank SinoPac. -> https://bank.sinopac.com/ \n\n", "background: #254a91; padding:5px 0;color: #ffffff;"];
    console.log.apply(console, a)
  } else {
    console.log("Developed by Bank SinoPac. -> https://bank.sinopac.com/");
  }

})();


var url = location.href;
// form ajax part
var targetInput = document.getElementById("target");
var nameInput = document.getElementById("name");
var noticeContentCheck = document.getElementById("notice-content");
var captchaInput = document.getElementById("captcha-val");
var updateCaptchaBtn = document.getElementById("update-captcha");
var userId = null;
var capt = null;
var nameValue = null;

var idNumberRule = /^[a-zA-Z]{1}(1|2){1}\d{8}$/i;
var nameRule = /[<>;&=(){}[\]"'\\/\\?#]/;
var captchaRule = /^[0-9]{4}$/i;

targetInput.addEventListener("change", function () {
  var originalUserId = this.value;
  var firstLetterUppered = originalUserId.slice(0, 1).toUpperCase();
  var leftParts = originalUserId.slice(1, this.value.length);
  userId = firstLetterUppered + leftParts;
  checkFormat(userId, "身分證號", idNumberRule);
});
nameInput.addEventListener("change", function () {
  nameValue = this.value;
  checkForMaliciousInput(nameValue, "姓名");
});

captchaInput.addEventListener("change", function () {
  capt = this.value;
  checkFormat(capt, "圖形驗證碼", captchaRule);
})

updateCaptchaBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  reloadCaptcha();
  console.log("圖形驗證碼測試");
})


// refresh input value
function resetVal(target) {
  target.value = "";
}

window.onload = function () {
  capt = null;
  nameValue = null;
  userId = null;

  resetVal(targetInput);
  resetVal(nameInput);
  resetVal(captchaInput);
}

$("#apply-form").submit(function (evt) {
  evt.preventDefault();
  if (checkIfCheck(noticeContentCheck) && checkFormat(userId, "身分證號", idNumberRule) && checkFormat(capt, "圖形驗證碼", captchaRule)) {
    postReq();
  }
  // first time null value
  if (userId === null) {
    alert("身分證號輸入值不可為空");
  }
  if (nameValue === null) {
    console.log("noname");
    alert("姓名輸入值不可為空");
  }
  if (capt === null) {
    alert("圖形驗證碼輸入值不可為空");
  }
  if (!checkIfCheck(noticeContentCheck)) {
    alert("請詳閱注意事項後並勾選 本人已詳閱注意事項..");
  }
})



function checkFormat(val, typeName, rule) {
  if (val) {
    var rule = rule;
    var found = val.match(rule);
    // console.log(found);
    if (found !== null && found.length >= 1) {
      return true;
    } else {
      alert(typeName + "格式錯誤");
      return false;
    }
  } else if (val === "") {
    alert(typeName + "輸入值不可為空");
    return false;
  }
}

function checkForMaliciousInput(input, inputName) {
  // 定义不允许的特殊字符
  const maliciousChars = ['<', '>', '&', ';', '=', '(', ')', '{', '}', '[', ']', '"', "'", '/', '\\', '?', '#'];

  // 检查输入中是否包含不允许的字符
  for (let i = 0; i < maliciousChars.length; i++) {
    if (input.includes(maliciousChars[i])) {
      alert(inputName + "欄位請勿包含特殊字符");
      return false;
      // 包含不允许的字符，进行处理（例如，拒绝输入或清理输入）
      // console.log(`${inputName} 包含不安全字符: ${maliciousChars[i]}`);
      // 这里你可以选择采取适当的行动，比如清理输入或者拒绝它
      return;
    }
  }

  // 输入安全，进行其他操作
  // console.log(`${inputName} 输入安全: ${input}`);
}

function reloadCaptcha() {
  var dummy = new Date().valueOf();
  var reloadUrl = "https://mma.sinopac.com/EventSiteApi/CaptchaImage.ashx?dummy=" + dummy;
  // console.log("reloadCaptcha:" + reloadUrl);
  if (url.indexOf("https://bank.sinopac.com/") != -1) {
    reloadUrl = 'https://mma.sinopac.com/EventSiteApi/CaptchaImage.ashx?dummy=' + dummy;
  } else if (url.indexOf("http://10.11.42.235/") != -1) {
    reloadUrl = 'http://10.11.42.235/EventSiteApi/CaptchaImage.ashx?dummy=' + dummy;

  } else {
    reloadUrl = 'http://10.11.36.36/EventSiteApi/CaptchaImage.ashx?dummy=' + dummy;

  }
  $("#captcha-img").attr("src", reloadUrl);

}

function postReq() {
  var apiUrl = "https://mma.sinopac.com/EventSiteApi/EntryPostHx.ashx";
  if (url.indexOf("https://bank.sinopac.com/") != -1) {
    apiUrl = 'https://mma.sinopac.com/EventSiteApi/EntryPostHx.ashx';
  } else if (url.indexOf("http://10.11.42.235/") != -1) {
    apiUrl = 'http://10.11.42.235/EventSiteApi/EntryPostHx.ashx';
  } else {
    apiUrl = 'http://10.11.36.36/EventSiteApi/EntryPostHx.ashx';
  }
  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: 'jsonp',
    jsonpCallback: 'sinoFunc',
    data: {
      proj: '2024-dawho-act04', // ** 專案名稱要換 跟PM要 *******************************
      c_no: userId,
      a_t: 'Y',
      capt: capt,
      u_ming: nameValue,
    },
    success: function (response) {
      alert(respCode(response));

      capt = null;
      userId = null;
      nameValue = null;
      noticeContentCheck.checked = false;
      reloadCaptcha();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert('登錄失敗');
      capt = null;
      userId = null;
      nameValue = null;
      noticeContentCheck.checked = false;
      reloadCaptcha();
    },
  });


  resetVal(targetInput);
  resetVal(nameInput);
  resetVal(captchaInput);

}

function checkIfCheck(target) {
  var checked;
  checked = target.checked ? true : false;
  return checked;
}

function parseResp(val) {
  var rule = /{.+}/i;
  // console.log(val.match(rule));
  return JSON.parse(val.match(rule)[0]);
}

function respCode(obj) {
  var code = obj.Code;
  var message;
  switch (code) {
    case '00':
      message = '登錄成功';
      break;
    case '11':
      message = '缺乏必填參數';
      break;
    case '12':
      message = '圖形驗證碼錯誤 驗證失敗';
      break;
    case '13':
      message = '資料長度錯誤 長度過長';
      break;
    case '14':
      message = '未同意條款';
      break;
    case '21':
      message = '新增資料失敗';
      break;
    case '22':
      message = '您之前已登錄成功過，謝謝您的參加';
      break;
    case '31':
      message = '系統忙碌中 請稍後再試';
      break;
    default:
      message = '其他錯誤';
  }
  return message;
}










