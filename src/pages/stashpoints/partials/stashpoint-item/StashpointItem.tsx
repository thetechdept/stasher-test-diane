import { FC, ReactNode } from 'react'
import { Avatar, Card, Rate, Space, Tag, theme, Typography } from "antd"
import { MdOutlinePlace, MdOutlineLuggage } from 'react-icons/md'

const { Text } = Typography

type IconTextProps = { icon: ReactNode, text: string | ReactNode }

const IconText: FC<IconTextProps> = ({ icon, text }) => {
  const {
    token: { sizeSM },
  } = theme.useToken();
  return (
    <Space direction="horizontal" size={4} align="center">
      <div style={{ display: 'flex' }}>
        {icon}
      </div>
      <Text type="secondary" style={{ fontSize: sizeSM }}>{text}</Text>
    </Space>
  )
}

const StashpointItem: FC<Record<string, any>> = ({ item, loading }) => {
  const {
    token: { sizeSM, padding },
  } = theme.useToken();
  const { photos, pricing_structure: price } = item
  return (
    <Card
      style={{
        width: '100%',
        padding: 0,
        overflow: 'hidden'
      }}
      bordered={false}
      bodyStyle={{ padding: "0" }}
      hoverable
      loading={loading}
    >

      <Space>
        <div
          style={{
            paddingLeft: padding,
          }}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            shape="square"
            src={photos[0]}
          />
          <div style={{ marginTop: sizeSM }}>
            {
              item.open_twentyopen_twentyfour_seven
                ? <Tag color="green-inverse">24/7</Tag>
                : ''
            }
            {
              item.open_late
                ? <Tag color="yellow">Open Late</Tag>
                : ''
            }
          </div>
        </div>
        <Space direction="vertical" style={{ padding: padding }}>
          <Text strong>{item.name}</Text>
          <Space size={6} direction="vertical">
            <IconText icon={<MdOutlinePlace />} text={item.address} />
            <IconText
              icon={<MdOutlineLuggage />}
              text={
                <>
                  <Text strong style={{
                    fontSize: sizeSM,
                  }}>
                    {item.capacity}
                  </Text>
                  <span> available space</span></>
              }
            />
            {/* <IconText
              icon={<MdOutlineAccessTime />}
              text={
                <Text
                  style={{ fontSize: sizeSM }}
                >
                  Open
                  
                </Text>
              }
            /> */}
            <Space size={8}>
              <Text type="secondary" style={{ fontSize: sizeSM }}>{item.rating}</Text>
              <Rate style={{ fontSize: sizeSM }} value={item.rating} allowHalf disabled />
              <Text type="secondary" style={{ fontSize: sizeSM }}>({item.rating_count})</Text>
            </Space>
          </Space>
        </Space>
      </Space>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: sizeSM,
          marginRight: sizeSM,
        }}
      >
        <Text strong>
          {price.ccy_symbol}
          {price.first_day_cost / price.ccy_minor_in_major}
          <Text style={{ fontSize: sizeSM }} type="secondary"> bag/day</Text>
        </Text>
      </div>
    </Card>
  )
}

export default StashpointItem