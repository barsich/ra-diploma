import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Container from '../components/Container';
import Cart from '../components/Cart';

export default function CartPage() {
  return (
    <>
      <Header />
      <Container>
        <Banner />
        <Cart/>
      </Container>
      <Footer />
    </>
  );
}
