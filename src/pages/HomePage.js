import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HotGoods from '../components/HotGoods';
import Goods from '../components/Goods';
import Container from '../components/Container';

export default function HomePage(props) {
  return (
    <>
      <Header />
      <Container>
        <Banner />
        <HotGoods />
        <Goods page={props.match.path} query={''} />
      </Container>
      <Footer />
    </>
  );
}
