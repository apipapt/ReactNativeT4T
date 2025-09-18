/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import fetcher, {getUser} from '../helpers/fetcher';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/color';
import {formatDateId} from '../helpers/formatDate';
import {Button} from '../helpers/button';

const {width} = Dimensions.get('window');

const MENU_ITEMS = {
  APPLY: 'Data Grower',
  DETAIL: 'Area Kerja',
  TREEE: 'Pohon',
  LOCATION: 'Lahan',
  FAQ: 'FAQ Grower',
};
const Home = ({onLogout}: {onLogout: () => void}) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  async function fetchUser() {
    const fetchedUser = await getUser();
    setUser(fetchedUser);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const act = '/GetFarmerAll';
  const fetchPosts = React.useCallback(async () => {
    if (!user?.employee_no) return;
    setIsLoading(true);
    const res = await (
      await fetcher()
    )
      .get(act, {
        params: {
          user_id: user.employee_no,
        },
      })
      .then(({data}) => {
        const datas = data.data.result.data;
        setPosts(datas);
        return datas;
      })
      .finally(() => {
        setIsLoading(false);
        setError('');
      });
    return {
      data: res,
      nextPage: 1,
    };
  }, [user?.employee_no]);

  useEffect(() => {
    if (user?.employee_no) {
      fetchPosts();
    }
  }, [user?.employee_no, fetchPosts]);

  useEffect(() => {
    // console.log('posts changed', posts);
  }, [posts]);

  const fetchPostDetail = async (id: string) => {
    setIsLoading(true);
    setError('');
    setSelectedPost(null);
    console.log('fetchPostDetail', id);

    try {
      const res = await (
        await fetcher()
      )
        .get('/GetFarmerDetail', {
          params: {
            id: id,
          },
        })
        .then(({data}) => {
          const dataResult = data.data.result;
          console.log('data', dataResult);
          setSelectedPost(dataResult);
          return dataResult;
        })
        .finally(() => {
          setIsLoading(false);
          setError('');
        });
      return {
        data: res,
        nextPage: 1,
      };
    } catch (err) {
      console.log('fetchPostDetail error', err);
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const renderPostItem = (data: any, index: number) => (
    <View key={index} style={tw`m-3 bg-white rounded-xl shadow-md`}>
      <View>
        <View style={[tw`flex flex-row items-center justify-between p-3 pb-2`]}>
          <Text style={tw`tex-sm text-black font-bold`} numberOfLines={1}>
            ID {data?.farmer_no}
          </Text>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text
              style={[
                tw`text-xs text-black px-3 rounded-full mr-2`,
                {
                  backgroundColor: colors.lightGreen,
                  color: colors.green,
                  borderWidth: 1,
                  borderColor: colors.green,
                  paddingVertical: 1,
                },
              ]}
              numberOfLines={1}>
              Lengkap
            </Text>
            <Text
              style={[
                tw`text-xs text-black px-3 rounded-full`,
                {
                  backgroundColor: colors.green,
                  color: colors.lightGreen,
                  paddingVertical: 2,
                },
              ]}
              numberOfLines={1}>
              Di Setujui
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center justify-between px-3`}>
          <TouchableOpacity
            style={[styles.headerSection]}
            activeOpacity={0.99}
            onPress={() => setSelectedPostId(data.id)}>
            {data?.farmer_profile ? (
              <Image
                source={{
                  uri: `https://geko-asset.t4t-api.org/${data?.farmer_profile}`,
                }}
                style={tw`w-17 h-17 rounded-md mr-2`}
              />
            ) : (
              <Ionicons
                style={tw`w-15 h-15 rounded-full mr-2`}
                name="person-circle"
                size={56}
                color={'#000'}
              />
            )}
            <View style={tw`flex flex-row`}>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={tw`text-base text-black font-bold`}
                      numberOfLines={1}>
                      {data?.name}
                    </Text>
                  </View>
                  <View
                    style={[
                      tw`mt-1`,
                      {flexDirection: 'row', alignItems: 'center'},
                    ]}>
                    <Text
                      style={[
                        tw`text-black rounded-lg px-2 mr-2`,
                        {
                          backgroundColor: colors.lightGreen,
                          color: colors.green,
                          paddingVertical: 2,
                          fontWeight: '300',
                        },
                      ]}>
                      NIK : {data?.ktp_no}
                    </Text>
                    <Text
                      style={[
                        tw`text-black rounded-lg px-2`,
                        {
                          backgroundColor: colors.lightGray,
                          color: colors.lightText,
                          paddingVertical: 2,
                          fontWeight: '300',
                        },
                      ]}>
                      Non Carbon
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    tw`text-xs mt-1`,
                    {
                      color: colors.lightText,
                    },
                  ]}>
                  {formatDateId(data?.created_at)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[tw`flex flex-row flex-wrap items-center p-3`]}>
          <Text
            style={[
              tw`text-black rounded-lg px-2 mr-2 mt-2`,
              {
                backgroundColor: colors.lightGray,
                color: colors.lightText,
                paddingVertical: 2,
                fontWeight: '300',
              },
            ]}>
            MU CIRASEA 2
          </Text>
          <Text
            style={[
              tw`text-black rounded-lg px-2 mr-2 mt-2`,
              {
                backgroundColor: colors.lightGray,
                color: colors.lightText,
                paddingVertical: 2,
                fontWeight: '300',
              },
            ]}>
            TA_CIRASEA02_ARJASAR
          </Text>
          <Text
            style={[
              tw`text-black rounded-lg px-2 mr-2`,
              {
                backgroundColor: colors.lightGray,
                color: colors.lightText,
                paddingVertical: 2,
                fontWeight: '300',
              },
            ]}>
            {data?.village}
          </Text>
        </View>

        <View
          style={[
            tw`flex flex-row items-center py-3 border-dashed mx-3`,
            {
              borderTopWidth: 2,
              borderColor: colors.lightGray,
            },
          ]}>
          <Text
            style={[
              tw`rounded-lg px-2 mr-2`,
              {
                color: colors.black,
                paddingVertical: 2,
                fontWeight: '600',
              },
            ]}>
            FF: {data?.nickname}
          </Text>
          <Text
            style={[
              tw`text-black rounded-lg px-2 mr-2`,
              {
                backgroundColor: colors.lightGray,
                color: colors.lightText,
                paddingVertical: 2,
                fontWeight: '300',
              },
            ]}>
            {data?.user_id}
          </Text>
        </View>
      </View>
    </View>
  );

  const [menu, setMenu] = useState(MENU_ITEMS.APPLY);

  const renderMenuButton = (title: string) => (
    <Button
      title={title}
      style={{
        ...styles.menuButton,
        borderBottomColor: menu === title ? colors.green : 'transparent',
      }}
      textStyle={{
        ...styles.menuButtonText,
        color: colors.green,
        fontWeight: menu === title ? '500' : '300',
      }}
      onPress={() => setMenu(title)}
    />
  );

  const renderPostDetail = () => (
    <View style={styles.detailContainer}>
      <TouchableOpacity
        onPress={() => {
          setSelectedPostId(null);
          fetchPosts();
        }}
        style={[styles.backButton, tw`h-10 pt-5`]}>
        <Text style={[styles.backButtonText, tw`my-auto`]}>Detail Grower</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : selectedPost ? (
        <View>
          <View style={styles.backgroundImage}>
            <View style={styles.profileHeader}>
              <View style={tw`flex-1 items-center justify-center`}>
                <Image
                  source={{
                    uri: `https://geko-asset.t4t-api.org/${selectedPost?.farmer_profile}`,
                  }}
                  style={styles.photo}
                />
                <Text style={styles.fullName}>{user?.fullname ?? ''}</Text>
                <Text style={styles.institution}>
                  {user?.instansi?.name ?? ''}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`mt-10`}>
            {renderMenuButton(MENU_ITEMS.APPLY)}
            {renderMenuButton(MENU_ITEMS.DETAIL)}
            {renderMenuButton(MENU_ITEMS.TREEE)}
            {renderMenuButton(MENU_ITEMS.LOCATION)}
            {renderMenuButton(MENU_ITEMS.FAQ)}
          </ScrollView>
          <View style={tw`m-3 bg-white rounded-xl shadow-md`}>
            <View>
              <View
                style={[
                  tw`flex flex-row items-center justify-between p-3 pb-2`,
                ]}>
                <Text style={tw`tex-sm text-black font-bold`} numberOfLines={1}>
                  ID {selectedPost?.farmer_no}
                </Text>
                <View style={tw`flex flex-row items-center justify-between`}>
                  <Text
                    style={[
                      tw`text-xs text-black px-3 rounded-full mr-2`,
                      {
                        backgroundColor: colors.lightGreen,
                        color: colors.green,
                        borderWidth: 1,
                        borderColor: colors.green,
                        paddingVertical: 1,
                      },
                    ]}
                    numberOfLines={1}>
                    Lengkap
                  </Text>
                  <Text
                    style={[
                      tw`text-xs text-black px-3 rounded-full`,
                      {
                        backgroundColor: colors.green,
                        color: colors.lightGreen,
                        paddingVertical: 2,
                      },
                    ]}
                    numberOfLines={1}>
                    Di Setujui
                  </Text>
                </View>
              </View>
              <View style={tw`flex flex-row items-center justify-between px-3`}>
                <TouchableOpacity
                  style={[styles.headerSection]}
                  activeOpacity={0.99}
                  onPress={() => {}}>
                  {selectedPost?.farmer_profile ? (
                    <Image
                      source={{
                        uri: `https://geko-asset.t4t-api.org/${selectedPost?.farmer_profile}`,
                      }}
                      style={tw`w-17 h-17 rounded-md mr-2`}
                    />
                  ) : (
                    <Ionicons
                      style={tw`w-15 h-15 rounded-full mr-2`}
                      name="person-circle"
                      size={56}
                      color={'#000'}
                    />
                  )}
                  <View style={tw`flex flex-row`}>
                    <View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={tw`text-base text-black font-bold`}
                            numberOfLines={1}>
                            {selectedPost?.name}
                          </Text>
                        </View>
                        <View
                          style={[
                            tw`mt-1`,
                            {flexDirection: 'row', alignItems: 'center'},
                          ]}>
                          <Text
                            style={[
                              tw`text-black rounded-lg px-2 mr-2`,
                              {
                                backgroundColor: colors.lightGreen,
                                color: colors.green,
                                paddingVertical: 2,
                                fontWeight: '300',
                              },
                            ]}>
                            NIK : {selectedPost?.ktp_no}
                          </Text>
                          <Text
                            style={[
                              tw`text-black rounded-lg px-2`,
                              {
                                backgroundColor: colors.lightGray,
                                color: colors.lightText,
                                paddingVertical: 2,
                                fontWeight: '300',
                              },
                            ]}>
                            Non Carbon
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          tw`text-xs mt-1`,
                          {
                            color: colors.lightText,
                          },
                        ]}>
                        {formatDateId(selectedPost?.created_at)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[tw`flex flex-row flex-wrap items-center p-3`]}>
                <Text
                  style={[
                    tw`text-black rounded-lg px-2 mr-2 mt-2`,
                    {
                      backgroundColor: colors.lightGray,
                      color: colors.lightText,
                      paddingVertical: 2,
                      fontWeight: '300',
                    },
                  ]}>
                  MU CIRASEA 2
                </Text>
                <Text
                  style={[
                    tw`text-black rounded-lg px-2 mr-2 mt-2`,
                    {
                      backgroundColor: colors.lightGray,
                      color: colors.lightText,
                      paddingVertical: 2,
                      fontWeight: '300',
                    },
                  ]}>
                  TA_CIRASEA02_ARJASAR
                </Text>
                <Text
                  style={[
                    tw`text-black rounded-lg px-2 mr-2`,
                    {
                      backgroundColor: colors.lightGray,
                      color: colors.lightText,
                      paddingVertical: 2,
                      fontWeight: '300',
                    },
                  ]}>
                  {selectedPost?.village}
                </Text>
              </View>

              <View
                style={[
                  tw`flex flex-row items-center py-3 border-dashed mx-3`,
                  {
                    borderTopWidth: 2,
                    borderColor: colors.lightGray,
                  },
                ]}>
                <Text
                  style={[
                    tw`rounded-lg px-2 mr-2`,
                    {
                      color: colors.black,
                      paddingVertical: 2,
                      fontWeight: '600',
                    },
                  ]}>
                  FF: {selectedPost?.nickname}
                </Text>
                <Text
                  style={[
                    tw`text-black rounded-lg px-2 mr-2`,
                    {
                      backgroundColor: colors.lightGray,
                      color: colors.lightText,
                      paddingVertical: 2,
                      fontWeight: '300',
                    },
                  ]}>
                  {selectedPost?.user_id}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>Tidak ada data post.</Text>
      )}
    </View>
  );

  useEffect(() => {
    if (selectedPostId) {
      fetchPostDetail(selectedPostId);
    }
  }, [selectedPostId]);

  if (selectedPostId) {
    return renderPostDetail();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Instagram</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" style={{marginTop: 50}} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item: {id: string}) => item.id}
          renderItem={({item, index}) => renderPostItem(item, index)}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
      <View style={[tw`absolute bottom-0 left-0 right-0`, styles.bottomBar]}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={tw`text-xs text-black font-semibold`}>Growe</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={tw`text-xs text-black font-semibold`}>Lahan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={tw`text-xs text-black font-semibold`}>Activiry</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={tw`text-xs text-black font-semibold`}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSection: {flexDirection: 'row', alignItems: 'center'},
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    elevation: 0,
  },
  menuButtonText: {
    fontSize: 14,
  },
  backgroundImage: {
    height: 100,
    width: '100%',
    paddingTop: 120,
    backgroundColor: colors.green,
  },
  backgroundImageStyle: {
    borderRadius: 15,
    marginTop: -20,
    height: 100,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  fullName: {
    ...tw`text-base font-bold`,
    color: colors.black,
  },
  institution: {
    ...tw`text-sm`,
    color: colors.green,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    fontFamily: 'Roboto', // Ganti font jika Anda memiliki font Instagram
  },
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#3897f0',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    color: '#000',
  },
  usernameBold: {
    fontWeight: 'bold',
  },
  postImage: {
    width: width,
    height: width, // Aspek rasio 1:1
  },
  postActions: {
    flexDirection: 'row',
    padding: 10,
    gap: 15,
  },
  actionIcon: {
    fontSize: 24,
  },
  postFooter: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  postText: {
    color: '#000',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  bottomIcon: {
    fontSize: 24,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingHorizontal: 20,
    backgroundColor: colors.green,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  postDetailText: {
    marginTop: 10,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});

export default Home;
