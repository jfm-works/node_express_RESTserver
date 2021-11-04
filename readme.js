//
//
// get


// ログインのため、idとpwをサーバに送信する
function loginAndGetSessionid(id,pw) {
    const body = new FormData();
    body.append('id', id);
    body.append('pw', pw);
    return fetch('/login', {
        method: 'POST',
        body
    }).then((response) => showRESTResponse(response));
}

app.post('/login', function(req, res) {
    const response = req;//'{"res":"post"}';
    console.log(req);
    res = response;
});


// 認証情報をサーバに送信する
//<INPUT TYPE="HIDDEN" NAME="MEMBERFLG" VALUE=<%= bolMember %>>
function checkAccount(params) {
    
}

// 着せ替え情報の登録状況を確認する

// 着せ替え情報を着せ替え管理サーバにアップロードする

// アップロード済みの着せ替え情報を削除する
function uploadedKisekaeDataDelete(){

}
// アップロード済みの着せ替え情報を変更する

// アップロード済みの着せ替え情報を承認する

// 承認済みの着せ替え情報を変更する

// 承認済みの着せ替え情報を削除する

// 承認済みの着せ替え情報を変更する

// 承認済みの着せ替え情報の公開日になったら、本番サーバにアップロードする
