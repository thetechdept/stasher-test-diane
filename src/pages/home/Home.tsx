import {
  Typography,
  Row,
  Col,
} from 'antd';


import SearchForm from 'components/search-form/SearchForm';

const { Title } = Typography

export type LatLng = {
  lat: number,
  lng: number
}

function Home() {
  return (
    <Row style={{ paddingTop: 64 }}>
      <Col sm={12} md={{
        span: 12,
        offset: 6
      }}>
        <Title level={5}>Find a stashpoint for your luggage</Title>
        <SearchForm size="large" />
      </Col>
    </Row>
  );
}

export default Home;
