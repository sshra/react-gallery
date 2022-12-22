import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: [],
  error: '',
  // partial load
  pageSize: 10,
  nextPage: 1,
  isLast: false,
};

initialState.data = [
  {
    id: 'beHd9WifKEgg',
    created_at: '2022-12-22T00:06:47Z',
    updated_at: '2022-12-22T08:56:01Z',
    promoted_at: '2022-12-22T08:56:01Z',
    width: 4000,
    height: 6000,
    color: '#735940',
    blur_hash: 'L3Bp5=$19a^*}5NGtRWC2fIpMxI@',
    description: null,
    alt_description: 'a living room with a checkered floor and a couch',
    urls: {
      raw: 'https://images.unsplash.com/photo-1671663606281-44682198255a?ixid=MnwzOTE2ODJ8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NzE3MTM0NDg&ixlib=rb-4.0.3',
      full: 'https://images.unsplash.com/photo-1671663606281-44682198255a?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzOTE2ODJ8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NzE3MTM0NDg&ixlib=rb-4.0.3&q=80',
      regular: 'https://images.unsplash.com/photo-1671663606281-44682198255a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTE2ODJ8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NzE3MTM0NDg&ixlib=rb-4.0.3&q=80&w=1080',
      small: 'https://images.unsplash.com/photo-1671663606281-44682198255a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTE2ODJ8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NzE3MTM0NDg&ixlib=rb-4.0.3&q=80&w=400',
      thumb: 'https://images.unsplash.com/photo-1671663606281-44682198255a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTE2ODJ8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NzE3MTM0NDg&ixlib=rb-4.0.3&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1671663606281-44682198255a'
    },
    links: {
      self: 'https://api.unsplash.com/photos/beHd9WifKEg',
      html: 'https://unsplash.com/photos/beHd9WifKEg',
      download: 'https://unsplash.com/photos/beHd9WifKEg/download?ixid=MnwzOTE2ODJ8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NzE3MTM0NDg',
      download_location: 'https://api.unsplash.com/photos/beHd9WifKEg/download?ixid=MnwzOTE2ODJ8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NzE3MTM0NDg'
    },
    likes: 5,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: {},
    user: {
      id: '_g1pdbtv6bg',
      updated_at: '2022-12-22T08:58:57Z',
      username: 'nourhan_m_sabek',
      name: 'Nourhan Sabek',
      first_name: 'Nourhan',
      last_name: 'Sabek',
      twitter_username: null,
      portfolio_url: null,
      bio: null,
      location: null,
      links: {
        self: 'https://api.unsplash.com/users/nourhan_m_sabek',
        html: 'https://unsplash.com/@nourhan_m_sabek',
        photos: 'https://api.unsplash.com/users/nourhan_m_sabek/photos',
        likes: 'https://api.unsplash.com/users/nourhan_m_sabek/likes',
        portfolio: 'https://api.unsplash.com/users/nourhan_m_sabek/portfolio',
        following: 'https://api.unsplash.com/users/nourhan_m_sabek/following',
        followers: 'https://api.unsplash.com/users/nourhan_m_sabek/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1669672530632-ea24a5863959image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
        medium: 'https://images.unsplash.com/profile-1669672530632-ea24a5863959image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64',
        large: 'https://images.unsplash.com/profile-1669672530632-ea24a5863959image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128'
      },
      instagram_username: 'nourhan_m_sabek',
      total_collections: 0,
      total_likes: 27,
      total_photos: 15,
      accepted_tos: true,
      for_hire: false,
      social: {
        instagram_username: 'nourhan_m_sabek',
        portfolio_url: null,
        twitter_username: null,
        paypal_email: null
      }
    }
  },
  // ... more photos
];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsPending: (state, action) => {
      console.log(action.payload);
      const { pageSize } = action.payload;
      if (pageSize) {
        // refresh list
        state = { ...initialState };
        state.pageSize = pageSize;
      }
      //      state.error = '';
    },
    itemsLoading: (state) => {
      state.loading = true;
    },
    itemsSuccess: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload];
      state.error = '';
      state.isLast = !action.payload.length;
      state.nextPage += 1;
    },
    itemsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

const { actions, reducer } = itemsSlice;
export const { itemsPending, itemsLoading, itemsSuccess, itemsFail } = actions;

export default reducer;
