import React, { Component } from 'react'
import { View, Text, Dimensions, VirtualizedList } from 'react-native'

class InfiniteViewPager extends Component {
    //only use if you want current page
    _onScrollEnd(e) {
      // const contentOffset = e.nativeEvent.contentOffset
      // const viewSize = e.nativeEvent.layoutMeasurement
      // // Divide the horizontal offset by the width of the view to see which page is visible
      // const pageNum = Math.floor(contentOffset.x / viewSize.width)
    }
    _renderPage(info) {
      const { index } = info
  
      return (
        <View style={{ width, height }}>
          <Text>
            {' '}{`index:${index}`}{' '}
          </Text>
        </View>
      )
    }
    render() {
      return (
        <VirtualizedList
          horizontal
          pagingEnabled
          initialNumToRender={3}
          getItemCount={data => data.length}
          data={stupidList}
          initialScrollIndex={startAtIndex}
          keyExtractor={(item, index) => index}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          maxToRenderPerBatch={1}
          windowSize={1}
          getItem={(data, index) => ({ index })}
          renderItem={this._renderPage}
          onMomentumScrollEnd={this._onScrollEnd}
        />
      )
    }
  }