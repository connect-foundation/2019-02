import React from 'react';
import S from './style';

const Help = () => (
  <S.Help>
    <S.Inner>
      <S.Title>About dropy</S.Title>
      <S.Content>
        {`Dropy는 쉽고 직관적인 사용자 인터랙션으로 ‘프레젠테이션 채널’이라는 가상 공간을 생성하여,
스피커와 리스너 간 원활한 소통을 도와주는 온라인 서비스입니다.
Dropy는 새로운 스피치 문화를 만들어 갑니다.`}
      </S.Content>
      <S.Title>How to use</S.Title>
      <S.List>
        <S.Order>채널 만들기를 클릭하여 pdf파일을 업로드 해보세요! 스피커가 되어 자신만의 채널을 만들 수 있습니다.</S.Order>
        <S.Order>채널 코드를 공유해보세요! 리스너들을 자신의 채널로 초대할 수 있습니다.</S.Order>
        <S.Order>스피치 중 익명 채팅 기능을 통해 리스너의 질문이나 피드백을 받아보세요. 해당 기능은 채널 설정에서 활성화할 수 있습니다.</S.Order>
        <S.Order>직관적인 리스너 피드백을 얻기 위해 위해 플라잉 이모지 이펙트를 사용해보세요. 해당 기능은 채널 설정에서 활성화할 수 있습니다.</S.Order>
      </S.List>
      <S.Title>Made by</S.Title>
      <S.ProfileWrapper>
        <S.Profile>
          <S.ProfileImg src="https://i.imgur.com/xfDbBJc.png" />
          <S.Name>김도현</S.Name>
          <S.Info>happytime870@naver.com</S.Info>
          <S.Link href="https://github.com/happydhKim">github.com/happydhKim</S.Link>
        </S.Profile>
        <S.Profile>
          <S.ProfileImg src="https://i.imgur.com/8CSvlJZ.png" />
          <S.Name>김재원</S.Name>
          <S.Info>jjazan201@gmail.com</S.Info>
          <S.Link href="https://github.com/load0ne">github.com/load0ne</S.Link>
        </S.Profile>
        <S.Profile>
          <S.ProfileImg src="https://i.imgur.com/2x6uOyb.png" />
          <S.Name>이미림</S.Name>
          <S.Info>leemirim9654@gmail.com</S.Info>
          <S.Link href="https://github.com/always-awake">github.com/always-awake</S.Link>
        </S.Profile>
        <S.Profile>
          <S.ProfileImg src="https://i.imgur.com/fRx5D7w.png" />
          <S.Name>조애리</S.Name>
          <S.Info>dofl5576@gmail.com</S.Info>
          <S.Link href="https://github.com/aereeeee">github.com/aereeeee </S.Link>
        </S.Profile>
      </S.ProfileWrapper>
      <S.Copyright>Copyright 2019. dropy all rights reserved.</S.Copyright>
    </S.Inner>
  </S.Help>
);

export default Help;
