import Banner from '../components/Banner';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OpenedItem from '../components/OpenedItem';

export default function ItemPage(props) {
  const { id } = props.match.params;

  return (
    <>
      <Header />
      <Container>
        <Banner />
        <OpenedItem id={id} />
      </Container>
      <Footer />
    </>
  );
}
