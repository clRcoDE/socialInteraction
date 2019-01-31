import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ScrollView,
  FlatList,
  LayoutAnimation,
  UIManager,
  Dimensions,
  TouchableHighlight,
  Easing
} from "react-native";
import dataSource from "./Data";
import { off } from "rsvp";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default class MainApp extends Component {
  constructor(props) {
    super(props);

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);

    this.state = {
      ScrollY: new Animated.Value(0),
      wrapValue: new Animated.Value(1),
      posY: new Animated.Value(0),
      isFollowed: false,
      upAndGo: new Animated.Value(25),
      
      buttonWidth: new Animated.Value(1),
      isScrolled:false
    };
    this.opacityUp = new Animated.Value(0);
    this.GoUp = new Animated.Value(0);
    this.scrollWrap = new Animated.Value(0);
    this.fadeInOut = new Animated.Value(1);
    // this.fadeIn = new Animated.Value(0)
    
  }

  configurefile = {
    duration: 2000,
    create: {
      type: "easeIn",
      // springDamping: 0.4,
      useNativeDriver: true,

      duration: 400,
      property: "opacity"
    },
    update: {
      type: "easeIn",
      // springDamping: 0.4,
      property: "opacity",
      useNativeDriver: true,
      duration: 400
    },
    delete: {
      type: "easeIn",
      // springDamping: 0.4,
      duration: 400,
      property: "opacity",
      useNativeDriver: true
    }
  };



  // configButton = {
  //   duration: 1000,
  //   create: {
  //     type: "easeIn",
  //     // springDamping: 0.4,
  //     useNativeDriver: true,

  //     duration: 400,
  //     property: "scaleX"
  //   },
  //   update: {
  //     type: "easeIn",
  //     // springDamping: 0.4,
  //     property: "scaleX",
  //     useNativeDriver: true,
  //     duration: 400
  //   },
  //   delete: {
  //     type: "easeIn",
  //     // springDamping: 0.4,
  //     duration: 400,
  //     property: "scaleX",
  //     useNativeDriver: true
  //   }
  // };

  //   easeTranslate = () => {
  //     Animated.timing(this.state.wrapValue, {
  //       toValue: 200,
  //       duration: 1000,
  //       useNativeDriver: true
  //     }).start();
  //     console.warn(this.state.wrapValue);
  //   };

  //   AnimateHeader = () => {
  //     if (this.state.ScrollY > 50) {
  //       // this.easeInTranslate();
  //       LayoutAnimation.configureNext(this.configurefile);
  //       this.setState({ wrapValue: 50 }, () => {
  //         console.warn("is Bigger than" + this.state.wrapValue);
  //       });
  //     } else {
  //       //  this.easeOutTranslate();
  //       LayoutAnimation.configureNext(this.configurefile);
  //       this.setState({ wrapValue: 150 }, () => {
  //         console.warn("is smaller than" + this.state.wrapValue);
  //       });
  //     }
  //   };

  //   AnimatedWayHeader = () => {
  //     if (this.state.ScrollY < 5) {
  //         console.warn('<5');
  //       this.easeZeroScale();
  //     } else if (this.state.ScrollY > 5 && this.state.ScrollY < 25) {
  //         console.warn('5<x<25');

  //       this.easeOnScroll();
  //     } else if (this.state.ScrollY > 25) {
  //         console.warn('x>25');

  //       this.easeStopped();
  //     }
  //   };

  //   easeZeroScale = () => {
  //     Animated.parallel([
  //       Animated.timing(this.state.wrapValue, {
  //         toValue: 1,
  //         duration: 250,
  //         delay: 0,
  //         useNativeDriver: true
  //       }),
  //       Animated.timing(this.state.posY, {
  //         toValue: 0,
  //         duration: 200,
  //         delay: 0,
  //         useNativeDriver: true
  //       })
  //     ]).start();
  //   };
  //   easeOnScroll = () => {
  //     Animated.parallel([
  //       Animated.timing(this.state.wrapValue, {
  //         toValue: 0.5,
  //         duration: 250,
  //         delay: 0,
  //         useNativeDriver: true
  //       }),
  //       Animated.timing(this.state.posY, {
  //         toValue: -100,
  //         duration: 200,
  //         delay: 0,
  //         useNativeDriver: true
  //       })
  //     ]).start();
  //   };

  //   easeStopped = () => {
  //     // Animated.timing(this.state.wrapValue, {
  //     //     toValue: 1,
  //     //     duration:100,
  //     //     delay: 0,
  //     //     useNativeDriver: true
  //     //   }).start();

  //     console.warn("hello");
  //   };

  //   easeInTranslate = () => {
  //     //   LayoutAnimation.configureNext(this.configurefile)
  //     //   this.setState({headerHeight:50})
  //     Animated.timing(this.state.wrapValue, {
  //       toValue: this.state.ScrollY,
  //       // maxValue:100,
  //       duration: 0,
  //       delay: 0,
  //       useNativeDriver: true
  //     }).start();
  //   };

  //   easeOutTranslate = () => {
  //     // LayoutAnimation.configureNext(this.configurefile)
  //     // this.setState({headerHeight:200})
  //     Animated.timing(this.state.wrapValue, {
  //       toValue: 0,
  //       duration: 0,
  //       delay: 0,
  //       useNativeDriver: true
  //     }).start();
  //   };

  // AnimateImage = offset => {
  //   if (offset < 2.5) {
  //     console.warn("0");
  //     //   this.easeZeroScale();
  //   } else if (offset > 2.5) {
  //     console.warn("1<x");

  //     //   this.easeOnScroll();
  //   }
  // };

  //   fadeUpOut = () => {
  //     Animated.parallel([Animated.timing(this.GoUp, {
  //       toValue: -50,
  //       duration: 200,
  //       useNativeDriver:true
  //     }),
  //     Animated.timing(this.fadeInOut,{
  // toValue:0,
  // duration:200,
  // useNativeDriver:true,

  //     })

  // ]).start()

  // };

  fadeUpIn = () => {};

  //     Animated.parallel([Animated.timing(this.GoUp, {
  //       toValue: 0,
  //       duration: 100,
  //       useNativeDriver:true,
  //     }),Animated.timing(this.fadeInOut,{
  // toValue:1,
  // duration:400,
  // useNativeDriver:true,

  //     })

  //   ]).start()

  // componentDidMount() {
  //   this.scrollWrap.addListener(({ value }) => (this.offset = value));
  // }

  // changeIsFollowed = x => {
  //   if (x === 1) {
  //     LayoutAnimation.configureNext(this.configurefile);
  //     this.setState({ isFollowed: true });
  //   } else {
  //     LayoutAnimation.configureNext(this.configurefile);
  //     this.setState({ isFollowed: false });
  //   }


  // };



  changeButton=()=>{
    // LayoutAnimation.configureNext(this.configButton)
    // this.setState({isScrolled:true})
  }

  render() {
    let heighter = this.scrollWrap.interpolate({
      inputRange: [0, 450],
      outputRange: [350, 100],
      extrapolate: "clamp"
    });

    let ImageHeighter = this.scrollWrap.interpolate({
      inputRange: [0, 400],
      outputRange: [200, 95],
      extrapolate: "clamp"
    });
    let InfoHeighter = this.scrollWrap.interpolate({
      inputRange: [0, 400],
      outputRange: [150, 0],
      extrapolate: "clamp"
    });
    let topper = this.scrollWrap.interpolate({
      inputRange: [0, 350],
      outputRange: [145, 0],
      extrapolate: "clamp"
    });

    let photoWidthHeight = this.scrollWrap.interpolate({
      inputRange: [0, 300],
      outputRange: [100, 60],
      extrapolate: "clamp"
    });

    let paddingH = this.scrollWrap.interpolate({
      inputRange: [0, 300],
      outputRange: [25, 0],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.componentContainer}>
        <Animated.View
          style={[
            styles.expandableHeader,

            {
              height: heighter
            }
            // {
            //   height:this.state.scrollWrap.interpolate([
            //       inputRange=[0,500],
            //       outputRange=[300,100]
            //   ])
            // //   transform: [{ scaleY: this.state.wrapValue },{translateY:this.state.posY}]
            // }
          ]}
        >
          <Animated.View style={styles.ImageContainer}>
            <Animated.Image
              source={require("../Assets/Images/neon-lights.png")}
              style={{
                width: deviceWidth,
                height: ImageHeighter
                // transform: [
                // //   { scaleY: this.state.wrapValue },
                //   { translateY:-100 }
                // ]
              }}
            />
            <Animated.View
              style={{
                transform: [{ translateY: this.GoUp }],
                backgroundColor: "yellowgreen",
                height: 140,
                justifyContent: "flex-end",
                borderWidth: 4,
                borderColor: "red",
                paddingBottom: 10,
                opacity: this.fadeInOut
              }}
            >
              <Animated.View style={[styles.BigProfileInfo]}>
                <Text>Brad Beardman</Text>
                <View style={styles.locationWrapper}>
                  <Image source={require("../Assets/Images/location.png")} />
                  <Text>San Fransisco , CA </Text>
                </View>
              </Animated.View>
              <View
                style={[styles.profileInfoWrapper, { flexDirection: "row" }]}
              >
                <View style={[styles.following, { flexDirection: "row" }]}>
                  <Text>1,209</Text>
                  <Text>Following</Text>
                </View>
                <View style={[styles.followers, { flexDirection: "row" }]}>
                  <Text>42.5</Text>
                  <Text>Followers</Text>
                </View>
              </View>
            </Animated.View>
            <Animated.View
              style={[styles.BigAbsoluteProfileView, { top: topper }]}
            >
              <View style={styles.profilePhotoWrapper}>
                <Animated.Image
                  source={require("../Assets/Images/profile.png")}
                  style={{
                    width: photoWidthHeight,
                    height: photoWidthHeight,
                    borderRadius: 100,
                    borderColor: "#fff",
                    borderWidth: 3
                  }}
                />
              </View>
              <View style={styles.centerFadeText}>
                <Animated.Text
                  style={[
                    styles.headerText,
                    {
                      opacity: this.opacityUp,
                      transform: [{ translateY: this.state.upAndGo }]
                    }
                  ]}
                >
                  Brad Beardman
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.headerText,
                    {
                      opacity: this.opacityUp,
                      transform: [{ translateY: this.state.upAndGo }]
                    }
                  ]}
                >
                  42.5K Followers
                </Animated.Text>
              </View>
              <Animated.View
                style={[
                  styles.followButton,
                  { 
                    // transform: [{ scaleX: this.state.buttonWidth }], 
                    // width: 50 ,
                     paddingHorizontal: paddingH, }
                ]}
              >
              {/* <TouchableHighlight onPress={() => {}}>{this.state.isScrolled ? <Text>++</Text> : <Text>Follow</Text>}</TouchableHighlight> */}
                
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.navigateWrapper]}>
          <TouchableHighlight onPress={() => {}}>
            <Text>Lastest photos</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {}}>
            <Text>Followers</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {}}>
            <Text>Following</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {}}>
            <Text>Favotites</Text>
          </TouchableHighlight>
        </Animated.View>
        <View style={styles.bodyWrapper}>
          <Animated.View
            style={[
              styles.flatlistWrapper

              // {transform: [{translateY:this.state.posY}]}
            ]}
          >
            <FlatList
              data={dataSource}
              keyExtractor={item => item.key}
              ref="_MainFlatlist"
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                {
                  Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: { y: this.state.animatedValue }
                        }
                      }
                    ],
                    { useNativeDriver: true } // <-- Add this
                  );
                }
                const scrollSensitivity = 4 / 3;
                const offset = nativeEvent.contentOffset.y / scrollSensitivity;
                LayoutAnimation.configureNext(this.configurefile);
                this.scrollWrap.setValue(offset);

                if (offset > 140) {
                  // this.setState({isScrolled:true})
                  this.changeButton()
                  // console.warn(this.state.isScrolled)

                  Animated.parallel([
                    Animated.timing(this.state.upAndGo, {
                      toValue: -5,
                      duration: 100,
                      delay: 0,
                      useNativeDriver: true
                    }),
                    Animated.timing(this.opacityUp, {
                      toValue: 1,
                      duration: 200,
                      useNativeDriver: true,
                      delay: 0
                    }),
                    // Animated.timing(this.state.buttonWidth, {
                    //   toValue: 1.5,
                    //   duration: 200,
                    //   delay: 0,
                    //   useNativeDriver: true,
                    //   easing: Easing.linear()
                    // })
                  ]).start();
                } else {
                  // this.setState({isScrolled:false})
                  // this.setState({isScrolled:false})
                  // console.warn(this.state.isScrolled)
                  this.changeButton()


                  Animated.parallel([
                    Animated.timing(this.state.upAndGo, {
                      toValue: 25,
                      duration: 100,
                      delay: 0,
                      useNativeDriver: true
                    }),
                    Animated.timing(this.opacityUp, {
                      toValue: 0,
                      duration: 200,
                      useNativeDriver: true,
                      delay: 0
                    }),
                    // Animated.timing(this.state.buttonWidth, {
                    //   toValue: 1,
                    //   duration: 200,
                    //   delay: 0,
                    //   useNativeDriver: true,
                    //   easing: Easing.linear()

                    // })
                  ]).start();
                }

                // this.fadeUpOut();
                //

                // console.warn(offset)
                // if (offset > 140) {
                //   this.changeIsFollowed(1);
                //   this.fadeUpOut();
                // } else {
                //   this.changeIsFollowed(0);
                //   this.fadeUpIn();

                // }
                // console.warn('hello'),
                // console.warn(offset)

                // this.AnimateImage(offset);
                // this.setState(
                // //   {
                // //       ScrollY: Math.floor(nativeEvent.contentOffset.y / 10)

                // //     },
                //   () => {
                //   this.AnimateHeader();
                //     // console.warn(this.state.wrapValue);
                // this.AnimatedWayHeader();
                //   }
                // );
              }}
              renderItem={({ item }) => (
                <View style={styles.flatlistElement}>
                  <Image
                    source={item.image}
                    style={{ height: 225, width: deviceWidth }}
                    // resizeMode='contain'
                  />
                  <View style={styles.NavInfo}>
                    <View style={styles.postNav}>
                      <TouchableHighlight
                        onPress={() => {}}
                        underlayColor="rgba(200,200,200,0.2)"
                      >
                        <Image source={require("../Assets/Images/like.png")} />
                      </TouchableHighlight>
                      <TouchableHighlight
                        onPress={() => {}}
                        underlayColor="rgba(200,200,200,0.2)"
                      >
                        <Image
                          source={require("../Assets/Images/comment.png")}
                        />
                      </TouchableHighlight>
                    </View>
                    <View style={styles.postInfo}>
                      <Text>{item.postedOn}</Text>
                    </View>
                  </View>

                  <View style={styles.likesView}>
                    <Text>{item.likes} likes</Text>
                  </View>
                  <View style={styles.postCaptionWrapper}>
                    <Text>{item.caption}</Text>
                  </View>
                </View>
              )}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: "flex-start"
  },
  expandableHeader: {
    // flex: 1,
    // height: 200,

    borderColor: "yellow",
    borderWidth: 3,
    backgroundColor: "royalblue",
    overflow: "hidden"
  },

  BigAbsoluteProfileView: {
    //   flex:1,
    height: 115,
    width: deviceWidth,
    backgroundColor: "rgba(200,200,200,0.3)",
    borderWidth: 5,
    borderColor: "red",
    position: "absolute",
    zIndex: 100,
    top: 10,
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15
  },

  followButton: {
    backgroundColor: "#ff326c",
    height: 30,
    // width: 50,
    borderRadius: 50,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  navigateWrapper: {
    height: 35,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 10
  },
  bodyWrapper: {
    borderColor: "lime",
    borderWidth: 3
  },
  flatlistElement: {
    height: 350,
    borderColor: "royalblue",
    borderWidth: 3
  },
  postNav: {
    flex: 1,
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  postInfo: {
    flex: 1,
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  NavInfo: {
    height: 25,
    flexDirection: "row",
    borderWidth: 3
  },
  locationWrapper: {
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "purple"
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600"
  }
});
