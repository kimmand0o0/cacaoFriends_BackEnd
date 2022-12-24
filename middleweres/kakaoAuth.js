window.Kakao.init("40a2a6a385c1da8e9f3a8c40f623dad1")

function kakaoLogin(){
    window.Kakao.Auth.login({
        scope:'	profile_nickname, account_email',
        success: function(authObj) {
            console.log(authObj);
            window.Kakao.API.request({
                url:'/v2/user/me',
                success: res => {
                    const kakao_account = res.kakao_account;
                    console.log(kakao_account)
                }
            })
        }
    })
}