# cacaoFriends_BackEnd

내 손 안에서 프렌즈의 이야기, 재밌는 이벤트, 새로운 쇼핑! 3만원 이상 구매 시 배송비 무료!! CACAO Friends!

</br>
<h1>1. 제작기간 및 팀원 소개</h1>

     2021년 12월 23일 ~ 29일 

     E반 1조 cacaoFriends 팀 

         백앤드 : 김영재, 김혜란, 김혜주
         프론트 : 이성배, 이재정(팀장)              
               
<h1>2. 사용기술</h1>

  <h3>Backend</h3>
      
      express
      MySQL
      OAuth
      
       
  <h3>Deploy</h3>
<img width="600" alt="스크린샷 2022-12-22 오후 4 24 01" src="https://user-images.githubusercontent.com/103705842/209755577-227a8c3e-ca08-4cde-9a2b-8dffa7b676ba.png">
        
        
       Github Actions 
       Docker 
       AWS EC2
       AWS ECS
       AWS ECR
       AWS Elastic Load Balancer
       
       

       
       
<h1>3. 실행화면 및 주소</h1>



<h1> 4. 핵심기능 </h1>

    카카오를 통한 소셜로그인/ 로그아웃 
    베스트 상품 조회, 신상품 조회, 캐릭터상품 조회 
    장바구니 담기, 장바구니 조회, 장바구니 수량 수정 및 삭제, 주문하기, 주문내역 조회 


<h1> 5. Trouble Shooting </h1>

1. ECS PM2 

서버에 에러가 생겼다고 서버가 죽으면 안 되기에 graceful reload를 해주는 pm2를 적용할려고 했다. 하지만 ecs는 서버에 에러가 생기면 자동으로 에러가 생긴 컨테이너를 종료시키고 기존 서버의 이미지로 컨테이너를 새로 돌려주기에 도커 컨테이너 내에서 PM2 클러스터 모드를 사용하는 것은 ECS에서 의미가 없고 애플리케이션의 메모리 소비를 증가시킬 뿐 어떠한 장점도 없기에 적용시키지않고 배포하기로 결정했다.

https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together

2. ECS dynamic port mapping

컨테이너가 ec2에서 돌아가고 있을 때 새로운 컨테이너가 배포되면 포트 번호가 중복되어 이미 사용하고 있다는 에러와 배포가 되지않았다. 그래서 찾아본 결과 호스트 포트를 0번으로 설정하면 에페메랄 포트(32768-61000) 범위의 포트가 자동으로 할당되며 alb에 설정해놓은 target group의 포트는 무시되었고 배포 또한 성공하였다.
