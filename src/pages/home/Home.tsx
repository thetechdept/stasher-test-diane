import { FC } from 'react'
import { Typography, Row, Col } from 'antd'

import SearchForm from 'components/search-form/SearchForm'

const { Title } = Typography

export type LatLng = {
  lat: number
  lng: number
}

const Home: FC<{ isMapLoaded: boolean }> = ({ isMapLoaded }) => {
  return (
    <Row style={{ paddingTop: 64 }}>
      <Col
        sm={12}
        md={{
          span: 12,
          offset: 6,
        }}
      >
        <Title level={5}>Find a stashpoint for your luggage</Title>
        <SearchForm size="large" isMapLoaded={isMapLoaded} />
      </Col>
    </Row>
  )
}

export default Home
