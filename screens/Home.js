import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
  TextInput,
} from 'react-native';
import { VictoryPie } from '../Victory'
import Moment from 'moment';
import { Svg } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';
var totalExpense = 0;
const date = new Date();
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const day = days[date.getDay()];

const Home = () => {
  let categoriesData = [
    {
      id: 1,
      name: 'Education',
      icon: icons.education,
      color: COLORS.yellow,
      expenses: [
        {
          id: 1,
          title: 'School Fee',
          description: 'School Fee',
          total: 0,
          temp: 0,
        },
        {
          id: 2,
          title: 'Books',
          description: 'Books Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 3,
          title: 'Stationary',
          description: 'Stationary Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 4,
          title: 'Uniform',
          description: 'Uniform Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 5,
          title: 'Others',
          description: 'Other Expenses',
          total: 0,
          temp: 0,
        },
      ],
    },
    {
      id: 2,
      name: 'Food',
      icon: icons.food,
      color: COLORS.lightBlue,
      expenses: [
        {
          id: 6,
          title: 'Vegetables',
          description: 'Vegetables',
          total: 0,
          temp: 0,
        },
        {
          id: 7,
          title: 'Fruits',
          description: 'Fruits',
          total: 0,
          temp: 0,
        },
        {
          id: 8,
          title: 'Other',
          description: 'Other Expenses',
          total: 0,
          temp: 0,
        },
      ],
    },
    {
      id: 3,
      name: 'Bills',
      icon: icons.bills,
      color: COLORS.darkgreen,
      expenses: [
        {
          id: 9,
          title: 'Water',
          description: 'Water Bill',
          total: 0,
          temp: 0,
        },
        {
          id: 10,
          title: 'Cable',
          description: 'Cable Bill',
          total: 0,
          temp: 0,
        },
        {
          id: 11,
          title: 'Electricity',
          description: 'Electricity Bills',
          total: 0,
          temp: 0,
        },
        {
          id: 12,
          title: 'Phone',
          description: 'Phone Bills',
          total: 0,
          temp: 0,
        },
        {
          id: 13,
          title: 'LPG Gas',
          description: 'LPG Bill',
          total: 0,
          temp: 0,
        },
        {
          id: 14,
          title: 'Home Rent',
          description: 'Home Rent',
          total: 0,
          temp: 0,
        },
        {
          id: 15,
          title: 'Shop Rent',
          description: 'Shop Rent',
          total: 0,
          temp: 0,
        },
        {
          id: 16,
          title: 'Maintainence',
          description: 'Maintainence Bills',
          total: 0,
          temp: 0,
        },
        {
          id: 17,
          title: 'Other',
          description: 'Other Bills',
          total: 0,
          temp: 0,
        },
      ],
    },
    {
      id: 4,
      name: 'Beauty & Care',
      icon: icons.healthcare,
      color: COLORS.peach,
      expenses: [
        {
          id: 18,
          title: 'Skin Care',
          description: 'Skin Care',
          total: 0,
          temp: 0,
        },
        {
          id: 19,
          title: 'Health Care',
          description: 'Health Care',
          total: 0,
          temp: 0,
        },
        {
          id: 20,
          title: 'Other',
          description: 'Other Expenses',
          total: 0,
          temp: 0,
        },
      ],
    },
    {
      id: 5,
      name: 'Clothing',
      icon: icons.cloth_icon,
      color: COLORS.red,
      expenses: [
        {
          id: 21,
          title: 'Clothes',
          description: 'Clothing Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 22,
          title: 'Bedsheets',
          description: 'Bedsheets, Covers, etc.',
          total: 0,
          temp: 0,
        },
        {
          id: 23,
          title: 'Curtains',
          description: 'Curtains',
          total: 0,
          temp: 0,
        },
        {
          id: 24,
          title: 'Other',
          description: 'Other Expenses',
          total: 0,
          temp: 0,
        },
      ],
    },
    {
      id: 6,
      name: 'Entertainment',
      icon: icons.entertainment,
      color: COLORS.lightBlue,
      expenses: [
        {
          id: 25,
          title: 'Movie',
          description: 'Movie Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 26,
          title: 'Outing',
          description: 'Outing Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 27,
          title: 'Restaurant',
          description: 'Restaurant Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 28,
          title: 'Other',
          description: 'Other Expenses',
          total: 0,
          temp: 0,
        },
      ],
    },
    {
      id: 7,
      name: 'Sports',
      icon: icons.sports_icon,
      color: COLORS.blue,
      expenses: [
        {
          id: 29,
          title: 'Gym',
          description: 'Gym Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 30,
          title: 'Equipment',
          description: 'Equipment Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 31,
          title: 'Other',
          description: 'Other Expenses',
          total: 0,
          temp: 0,
        },
      ],
    },
    {
      id: 8,
      name: 'Miscellaneous',
      icon: icons.other,
      color: COLORS.purple,
      expenses: [
        {
          id: 32,
          title: 'Fuel',
          description: 'Fuel Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 33,
          title: 'Home Appliances',
          description: 'Home Appliances',
          total: 0,
          temp: 0,
        },
        {
          id: 34,
          title: 'Kitchen',
          description: 'Kitchen Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 35,
          title: 'Furniture',
          description: 'Furniture Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 36,
          title: 'Donation',
          description: 'Donation Expenses',
          total: 0,
          temp: 0,
        },
        {
          id: 37,
          title: 'Other',
          description: 'Other Expenses',
          total: 0,
          temp: 0,
        },
      ],
    },
  ];

  const categoryListHeightAnimationValue = useRef(new Animated.Value(115))
    .current;

  const [categories, setCategories] = React.useState(categoriesData);
  const [viewMode, setViewMode] = React.useState('chart');
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showMoreToggle, setShowMoreToggle] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      var month = await AsyncStorage.getItem('Month');
      if (String(Moment().format('MMM')) === month) {
        for (var j = 0; j < categoriesData.length; j++) {
          for (var k = 0; k < categoriesData[j].expenses.length; k++) {
            var value = await AsyncStorage.getItem(
              String(categoriesData[j].expenses[k].id)
            );
            if (value !== null) {
              var value1 = JSON.parse(value);
              categoriesData[j].expenses[k].total = value1.total
            }
          }
        }
      } else {
        AsyncStorage.clear();
        AsyncStorage.setItem('Month', Moment().format('MMM'));
      }
    } catch (error) {
      alert(error);
    }
  }

  function uploadData(item) {
    try {
      AsyncStorage.setItem(String(item.id), JSON.stringify(item));
      AsyncStorage.setItem('Month', String(Moment().format('MMM')));
    } catch (error) {
      alert(error);
    }
  }
  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.f2, marginTop: 10 }}>
            My Expenses
          </Text>
          <Text style={{ ...FONTS.f3, color: COLORS.darkgray }}>
            Summary (private)
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.calendar}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue,
              }}
            />
          </View>

          <View style={{ marginLeft: SIZES.padding }}>
            <Text style={{ color: COLORS.primary, ...FONTS.f2 }}>
              {Moment().format('DD MMM YYYY')}
            </Text>
            <Text style={{ color: COLORS.darkgray, ...FONTS.f3 }}>{day}</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: SIZES.padding,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.f3 }}>CATEGORIES</Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
            {categories.length} Total
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: viewMode == 'chart' ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            onPress={() => setViewMode('chart')}>
            <Image
              source={icons.chart}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == 'chart' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: viewMode == 'list' ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
              marginLeft: SIZES.base,
            }}
            onPress={() => setViewMode('list')}>
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == 'list' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <Image
          source={item.icon}
          style={{
            width: 20,
            height: 20,
            tintColor: item.color,
          }}
        />
        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.primary,
            ...FONTS.f4,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.base,
            justifyContent: 'center',
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 230,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }

            setShowMoreToggle(!showMoreToggle);
          }}>
          <Text style={{ ...FONTS.body4 }}>
            {showMoreToggle ? 'MORE' : 'LESS'}
          </Text>
          <Image
            source={showMoreToggle ? icons.down_arrow : icons.up_arrow}
            style={{
              marginLeft: 5,
              width: 15,
              height: 15,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderIncomingExpensesTitle() {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: COLORS.lightGray2,
          padding: SIZES.padding,
        }}>
        <Text style={{ ...FONTS.f3, color: COLORS.primary }}>
          INCOMING EXPENSES
        </Text>
        <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>37 Total</Text>
      </View>
    );
  }

  function renderIncomingExpenses() {
    let allExpenses = selectedCategory ? selectedCategory.expenses : [];
    let incomingExpenses = allExpenses;

    const renderItem = ({ item, index }) => (
      <View
        style={{
          width: 300,
          marginRight: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginVertical: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: COLORS.lightGray,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SIZES.base,
            }}>
            <Image
              source={selectedCategory.icon}
              style={{
                width: 30,
                height: 30,
                tintColor: selectedCategory.color,
              }}
            />
          </View>

          <Text style={{ ...FONTS.f3, color: selectedCategory.color }}>
            {selectedCategory.name}
          </Text>
        </View>

        <View style={{ paddingHorizontal: SIZES.padding }}>
          <Text style={{ ...FONTS.f2 }}>{item.title}</Text>
          <Text
            style={{
              ...FONTS.body3,
              flexWrap: 'wrap',
              color: COLORS.darkgray,
            }}>
            {item.description}
          </Text>

          <Text
            style={{
              ...FONTS.body3,
              flexWrap: 'wrap',
              color: COLORS.darkgray,
            }}>
            {item.total} spent till now.
          </Text>

          <Text style={{ marginTop: SIZES.padding, ...FONTS.f4 }}>Amount</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 5,
                marginBottom: SIZES.base,
                width: 200,
                paddingLeft: 10,
                color: selectedCategory.color,
                ...FONTS.body4,
              }}
              onChangeText={(val) => {
                item.temp = Number(val);
              }}
              multiline={true}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomStartRadius: SIZES.radius,
            borderBottomEndRadius: SIZES.radius,
            backgroundColor: selectedCategory.color,
          }}
          onPress={() => {
            item.total += item.temp;
            item.temp = 0;
            uploadData(item);
          }}>
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View>
        {renderIncomingExpensesTitle()}

        {incomingExpenses.length > 0 ? (
          <FlatList
            data={incomingExpenses}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : null}

        {incomingExpenses.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}>
            <Text style={{ color: COLORS.primary, ...FONTS.f3 }}>
              No Record
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    let chartData = categories.map((item) => {
      let confirmExpenses = item.expenses;
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    let filterChartData = chartData.filter((a) => a.y > 0);

    totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    let finalChartData = filterChartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
  }

  function setSelectCategoryByName(name) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );

    if (Platform.OS == 'ios') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <VictoryPie
            data={chartData}
            labels={(datum) => `${datum.y}`}
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={({ innerRadius }) =>
              (SIZES.width * 0.4 + innerRadius) / 2.5
            }
            style={{
              labels: { fill: 'white' },
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width * 0.8}
            height={SIZES.width * 0.8}
            colorScale={colorScales}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: 'labels',
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{ position: 'absolute', top: '42%', left: '42%' }}>
            <Text style={{ ...FONTS.f1, textAlign: 'center' }}>
              {totalExpense}
            </Text>
            <Text style={{ ...FONTS.body3, textAlign: 'center' }}>spent</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Svg
            width={SIZES.width}
            height={SIZES.width}
            style={{ width: '100%', height: 'auto' }}>
            <VictoryPie
              standalone={false}
              data={chartData}
              labels={(datum) => `${datum.y}`}
              radius={({ datum }) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? SIZES.width * 0.4
                  : SIZES.width * 0.4 - 10
              }
              innerRadius={70}
              labelRadius={({ innerRadius }) =>
                (SIZES.width * 0.4 + innerRadius) / 2.5
              }
              style={{
                labels: { fill: 'white' },
                parent: {
                  ...styles.shadow,
                },
              }}
              width={SIZES.width}
              height={SIZES.width}
              colorScale={colorScales}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: 'labels',
                          mutation: (props) => {
                            let categoryName = chartData[props.index].name;
                            setSelectCategoryByName(categoryName);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
          <View
            style={{ position: 'absolute', top: '42%', alignSelf: 'center' }}>
            <Text style={{ ...FONTS.f1, textAlign: 'center' }}>
              {totalExpense}
            </Text>
            <Text style={{ ...FONTS.body3, textAlign: 'center' }}>spent</Text>
          </View>
        </View>
      );
    }
  }

  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay();

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.f3,
            }}>
            {item.name}
          </Text>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.f3,
            }}>
            {item.y} - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      {renderHeader()}

      {renderCategoryHeaderSection()}

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {viewMode == 'list' ? (
          <View>
            {renderCategoryList()}
            {renderIncomingExpenses()}
          </View>
        ) : null}
        {viewMode == 'chart' ? (
          <View>
            {renderChart()}
            {renderExpenseSummary()}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default Home;
