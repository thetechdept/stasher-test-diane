import { FC, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { getGeocode, getLatLng } from 'use-places-autocomplete'

import dayjs from 'dayjs'

import {
  Button,
  Card,
  DatePicker,
  Form,
  InputNumber,
  Space,
  theme,
  Typography,
} from 'antd'
import { MdOutlineEast } from 'react-icons/md'
import { SizeType } from 'antd/es/config-provider/SizeContext'

import PlacesAutocomplete from 'components/places-autocomplete'
import { LatLng } from 'pages/home/Home'

const { Text } = Typography

type SearchFormProps = {
  size: SizeType
  isMapLoaded: boolean
}

const { Paragraph } = Typography

const SearchForm: FC<SearchFormProps> = ({ size, isMapLoaded }) => {
  const [searchParams] = useSearchParams()

  const params = Object.fromEntries(
    new URLSearchParams(searchParams.toString())
  )

  const navigate = useNavigate()
  const smallForm = size === 'small'
  const [latlng, setLatLng] = useState<LatLng>({
    lat: Number(params.lat),
    lng: Number(params.lng),
  })
  const [selectedAddress, setAddress] = useState(params.address || '')

  const today = dayjs()
  const todayPlus1hr = today.add(1, 'hour')

  const initValues = {
    address: params.address || '',
    capacity: params.capacity || 1,
    dropoff: params.dropoff ? dayjs(params.dropoff) : today,
    pickup: params.pickup ? dayjs(params.pickup) : todayPlus1hr,
  }

  const {
    token: { fontSizeSM, sizeXL, sizeSM, sizeXS },
  } = theme.useToken()

  const onSelect = async (address: string) => {
    const res = await getGeocode({ address })
    const { lat, lng } = getLatLng(res[0])
    setLatLng({ lat, lng })
    setAddress(address)
  }

  const handleClickSearch = async (values: any) => {
    const { lat, lng } = latlng as LatLng
    console.log(values)

    const { dropoff, pickup, capacity } = values

    const params = {
      address: selectedAddress,
      lat,
      lng,
      capacity,
      dropoff: new Date(dropoff).toISOString(),
      pickup: new Date(pickup).toISOString(),
    }
    navigate({
      pathname: '/stashpoints',
      search: qs.stringify({
        ...params,
      }),
    })
  }

  useEffect(() => {}, [params.address])

  return (
    <Card
      bordered={false}
      style={{
        width: '100%',
        paddingBottom: 32,
      }}
      bodyStyle={{
        padding: smallForm ? sizeXS : sizeXL,
      }}
    >
      <Paragraph
        style={{
          marginBottom: sizeXS,
          fontSize: fontSizeSM,
        }}
      >
        Choose a location
      </Paragraph>
      <Form
        initialValues={initValues}
        layout="vertical"
        onFinish={handleClickSearch}
      >
        <PlacesAutocomplete
          size={size}
          loaded={isMapLoaded}
          onSelect={onSelect}
          address={selectedAddress}
        />
        <Space
          style={{ marginTop: smallForm ? sizeSM : sizeXL }}
          direction="horizontal"
        >
          <Form.Item label="Number of Bags" name="capacity">
            <InputNumber style={{ width: 120 }} min={1} max={50} />
          </Form.Item>
          <Form.Item label="Drop-off" name="dropoff">
            <DatePicker
              disabledDate={(current) =>
                current && current.valueOf() < Date.now()
              }
              showTime={{ format: 'hh:mm A', use12Hours: true }}
            />
          </Form.Item>
          <Form.Item label="Pickup-off" name="pickup">
            <DatePicker
              disabledDate={(current) =>
                current && current.valueOf() < Date.now()
              }
              showTime={{ format: 'hh:mm A', use12Hours: true }}
            />
          </Form.Item>
        </Space>
        <div
          style={{
            position: 'absolute',
            left: ' 50%',
            transform: 'translateX(-50%)',
            bottom: smallForm ? -12 : -24,
          }}
        >
          <Button
            size={size}
            type="primary"
            htmlType="submit"
            // onClick={}
          >
            <Space align="center">
              <Text
                style={{
                  fontSize: smallForm ? 12 : 16,
                  color: '#fff',
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                Search Stashpoints
              </Text>
              {size !== 'small' && (
                <div style={{ display: 'flex' }}>
                  <MdOutlineEast size={20} />
                </div>
              )}
            </Space>
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default SearchForm
