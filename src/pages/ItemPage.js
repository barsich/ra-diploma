import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectedItem } from '../actions/actionCreators';
import Banner from '../components/Banner';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OpenedItem from '../components/OpenedItem';

export default function ItemPage(props) {
  const { id } = props.match.params;
  const dispath = useDispatch();
  const { selectedItem, status } = useSelector((state) => state.itemListReducer);

  useEffect(() => {
    dispath(fetchSelectedItem(id));
  }, [dispath, id]);

  return (
    <>
      <Header />
      <Container>
        <Banner />
        <OpenedItem id={id} item={selectedItem} />
      </Container>
      <Footer />
    </>
  );
}
