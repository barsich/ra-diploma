import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Goods from '../components/Goods';
import Container from '../components/Container';

export default function CatalogPage(props) {
  return (
    <>
      <Header />
      <Container>
        <Banner />
        <Goods query={props.location.search} page={props.match.path} />
      </Container>
      <Footer />
    </>
  );
}
