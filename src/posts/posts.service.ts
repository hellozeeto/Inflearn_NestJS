import { Injectable, NotFoundException } from '@nestjs/common';

/**
 *  author: string;
 *  title: string;
 *  content: string;
 *  likeCount: number;
 *  commentCount: number;
 */

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 99999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 혜린',
    content: '노래 연습하고 있는 혜린',
    likeCount: 1000000,
    commentCount: 99999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제',
    content: ' 종합운동장에서 공연중인 로제',
    likeCount: 1000000,
    commentCount: 99999,
  },
];

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id); // string으로 받기 때문에 +를 붙여야 숫자로 비교함.

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1, // 마지막 값의 id에 + 1 -> 새로운 post를 만들거니까.
      author, // key와 value가 같으면 생략 가능 이하동문
      title,
      content,
      likeCount: 0, // 새로 생성하는거니까 당연히 0, 이하동문
      commentCount: 0,
    };

    posts = [
      ...posts, // 스프레드
      post, // 맨 마지막에 새로 만든 post 추가
    ];

    return post; // 응답은 새로 만든 post 반환 -> 나중에 서버 클라우드에 올리면 데이터 보낸 만큼 과금을 하기 때문에 최소한만 반환, 다 반환해도 됨.
  }

  updatePost(
    postId: number,
    author?: string,
    title?: string,
    content?: string,
  ) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost)); // 기존 prevPost와 바꾸려는 post의 아이디 (+하는 이유는 스트링이기 때문)가 같으면 post로 바꾼다.
    return post;
  }

  deletePost(postId: number) {
    const post = posts.find((post) => post.id === postId); // string으로 받기 때문에 +를 붙여야 숫자로 비교함.

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== postId);

    return postId;
  }
}
