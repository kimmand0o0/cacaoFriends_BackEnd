# cacaoFriends_BackEnd

내 손 안에서 프렌즈의 이야기, 재밌는 이벤트, 새로운 쇼핑! 3만원 이상 구매 시 배송비 무료!! CACAO Friends!

</br>
<h1>제작기간 및 팀원 소개</h1>

     2022년 12월 23일 ~ 29일

     E반 2조 cacaoFriends 팀

         백앤드 : 김영재, 김혜란, 김혜주
         프론트 : 이성배, 이재정(팀장)

<h1>📚 STACKS</h1>

  <h3>Backend</h3>
      
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"></br><img src="https://img.shields.io/badge/Oauth-FFCD00?style=for-the-badge&logo=Kakao&logoColor=white"><img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
      
       
  <h3>Deploy</h3>
<img width="600" alt="스크린샷 2022-12-22 오후 4 24 01" src="https://user-images.githubusercontent.com/103705842/209755577-227a8c3e-ca08-4cde-9a2b-8dffa7b676ba.png">
        
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"></br>
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white"><img src="https://img.shields.io/badge/Amazon ELB-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"><img src="https://img.shields.io/badge/Amazon ECR-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"><img src="https://img.shields.io/badge/Amazon ECS-FF9900?style=for-the-badge&logo=Amazon ECS&logoColor=white"><img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">



<h1>실행화면 및 주소</h1>

<img width="400" alt="스크린샷 2022-12-29 오후 3 55 41" src="https://user-images.githubusercontent.com/103705842/209915364-c7aa8108-6bdc-4c51-b602-a4f8ea2e88e9.png"><img width="400" alt="스크린샷 2022-12-29 오후 3 55 45" src="https://user-images.githubusercontent.com/103705842/209915371-18db5bc4-2c6c-4ee0-b96e-296d23ac7c79.png">
<img width="400" alt="스크린샷 2022-12-29 오후 3 56 17" src="https://user-images.githubusercontent.com/103705842/209915380-10608885-38d4-4b9a-8ff8-dde38e4c9d21.png"><img width="400" alt="스크린샷 2022-12-29 오후 3 56 26" src="https://user-images.githubusercontent.com/103705842/209915384-f51bd289-61e2-4282-9967-c51d8b200237.png">
<img width="400" alt="스크린샷 2022-12-29 오후 3 56 49" src="https://user-images.githubusercontent.com/103705842/209915390-bc2fe7a9-3985-411a-a11d-67f4eee7a6d5.png"><img width="400" alt="스크린샷 2022-12-29 오후 3 56 56" src="https://user-images.githubusercontent.com/103705842/209915396-7fecd898-041c-4a93-871d-f2e012777a37.png">

<h3>https://clonekakaoproject.vercel.app/home</h3>


<h1> 핵심기능 </h1>

    카카오를 통한 소셜로그인/ 로그아웃
    베스트 상품 조회, 신상품 조회, 캐릭터상품 조회
    장바구니 담기, 장바구니 조회, 장바구니 수량 수정 및 삭제, 주문하기, 주문내역 조회

<h1> Trouble Shooting </h1>

1. ECS PM2

서버에 에러가 생겼다고 서버가 죽으면 안 되기에 graceful reload를 해주는 pm2를 적용할려고 했다. 하지만 ecs는 서버에 에러가 생기면 자동으로 에러가 생긴 컨테이너를 종료시키고 기존 서버의 이미지로 컨테이너를 새로 돌려주기에 도커 컨테이너 내에서 PM2 클러스터 모드를 사용하는 것은 ECS에서 의미가 없고 애플리케이션의 메모리 소비를 증가시킬 뿐 어떠한 장점도 없기에 적용시키지않고 배포하기로 결정했다.

https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together

2. ECS dynamic port mapping

컨테이너가 ec2에서 돌아가고 있을 때 새로운 컨테이너가 배포되면 포트 번호가 중복되어 이미 사용하고 있다는 에러와 배포가 되지않았다. 그래서 찾아본 결과 호스트 포트를 0번으로 설정하면 에페메랄 포트(32768-61000) 범위의 포트가 자동으로 할당되며 alb에 설정해놓은 target group의 포트는 무시되었고 배포 또한 성공하였다.

3. 소셜 로그인 트러블 슈팅

3-1. 라이브러리 사용 문제
 네이버와 구글 소셜 로그인 같은 경우는 패스포트라는 라이브러리의 예시가 잘 나와있었지만, 카카오의 경우에는 라이브러리 예시가 없었다. 오픈 API를 이용한 사례가 많았으며, 카카오 디벨로퍼 문서로 잘 정리가 되어있어 그 부분을 보고 코딩을 시작하였다.

3-2. 400 ip mismatched
 카카오 디벨로퍼 사이트에 허용 ip를 등록해 주지 않아 생기는 문제였다. 다만, 컴퓨터 터미널에서 ipconfig를 통해 찾을 수 있는 부분이 아닌, 에러코드의 어드레스에 적혀있는 ip를 등록해야 한다는 특이한 부분이 있었다. 실제로 사이트에 접속하는 아이피는 터미널에 찍히는 ip와 다른 모양이었다.

3-3. KOE006 등록되지 않은 Redirect URI를 인가 코드 요청에 사용한 경우
 Redirect URI를 배포하면 다시 등록해 주어야 하는 문제가 있었으며, 프론트에서 사용하는 uri를 등록해주어야 했다.

3-4. KOE303 invalid_grant
 위의 에러와 비슷했지만, 인가코드와 토큰 요청 Redirect URI가 같아야 했다. 이부분을 위해 프론트와 다시한번 uri를 맞춰야 했다.

3-5. KOE320 invalid_grant
 인가코드는 잘못 요청을 보냈더라도 한번 사용하면 재사용이 불가능했다. 이 경우 인가코드부터 다시 발급 받는 방식으로 해결했다.

4. 클라이언트에 헤더로 토큰 전달이 안되었던 문제

헤더에 토큰을 담아서 보냈으나 프론트에서 보이지 않는 문제가 있었다. CORS 설정 중 exposedHeaders라는 설정을 해줌으로 해결하였다.
