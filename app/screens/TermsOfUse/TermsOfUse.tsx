import React from 'react';
import { Dimensions } from 'react-native';
import HTML from 'react-native-render-html';

import { Container, Content } from '@app/components';

import htmlContent from './tems-of-use-content';

const TermsOfUse = () => {
  return (
    <Container>
      <Content>
        <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
      </Content>
    </Container>
  );
};

export default TermsOfUse;
