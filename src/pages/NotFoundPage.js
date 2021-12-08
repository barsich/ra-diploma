import Banner from '../components/Banner';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Container>
        <Banner />
        <section className="top-sales">
          <h2 className="text-center">Страница не найдена</h2>
          <p>Извините, такая страница не найдена!</p>
        </section>
      </Container>
      <Footer />
    </>
  );
}
