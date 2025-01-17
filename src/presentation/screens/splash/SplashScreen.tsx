import {Layout, Spinner} from '@ui-kitten/components';

export const SplashScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner status="primary" size="large" />
    </Layout>
  );
};
