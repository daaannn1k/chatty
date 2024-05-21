import { createSearchParams } from 'react-router-dom';

export class ProfileUtils {
  static navigateToProfile(data, navigate) {
    const searchParams = createSearchParams({ id: data?.id, uId: data?.uId}).toString();
    const url = `/app/social/profile/${data?.username}?${searchParams}`
    navigate(url);
  }
}