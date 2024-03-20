export const PostPlaceHolder = {
  post: {
    postNo: -9999,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi commodi earum tenetur. Asperiores dolorem placeat ab nobis iusto culpa, autem molestias molestiae quidem pariatur. Debitis beatae expedita nam facere perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus cupiditate rerum officiis consequuntur laborum doloremque quaerat ipsa voluptates, nobis nam quis nulla ullam at corporis, similique ratione quasi illo!",
    modifyAt: "9999-01-01",
    createAt: "9999-01-01",
  },
  writer: {
    username: "Writer Name Place Holder",
    filePath: null,
  },
  files: [],
};

export const ReplyPlaceholder = {
  reply: {
    replyNo: -9999,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi commodi earum tenetur. Asperiores dolorem placeat ab nobis iusto culpa, autem molestias molestiae quidem pariatur. Debitis beatae expedita nam facere perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus cupiditate rerum officiis consequuntur laborum doloremque quaerat ipsa voluptates, nobis nam quis nulla ullam at corporis, similique ratione quasi illo!",
    modifyAt: null,
    createAt: "9999-01-01",
  },
  writer: {
    username: "Writer Name Place Holder",
    filePath: null,
  },
};

export const PostListPlaceholder = [];

export const RepliesPlaceholder = {
  content: [],
};

for (let i = 0; i < 5; i++) {
  RepliesPlaceholder.content.push(ReplyPlaceholder);
  PostListPlaceholder.push(PostPlaceHolder);
}
