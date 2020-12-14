import { css, cx } from '@emotion/css';
import { FC } from 'react';

const container = css`
  color: #999;
  font-size: 13px;
  margin: 0 auto;
  padding: 32px 0;
  max-width: 1200px;
`;

const Main: FC = () => (
  <main className={cx('main', container)}>
    <p className="main__text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius iaculis nisl, quis
      mollis ante euismod vitae. Donec id neque interdum libero malesuada facilisis. Mauris eu
      aliquam risus. Suspendisse id sem ex. Praesent in neque eu elit consequat rutrum ullamcorper
      sed nisl. Donec tristique faucibus dapibus. Vivamus urna lorem, facilisis at sodales a,
      imperdiet vel ipsum. Morbi blandit, neque ut condimentum porta, eros quam vulputate est,
      tincidunt commodo risus orci a leo. Suspendisse id purus vel dui finibus aliquet. Nunc
      fermentum fringilla metus in semper. Maecenas mollis at ex vel varius. Quisque ultrices nibh
      a viverra laoreet. Aliquam velit lectus, tristique ac egestas nec, bibendum eget eros. Etiam
      viverra faucibus lectus, sed consectetur lorem maximus sit amet.
    </p>
  </main>
);

export default Main;
