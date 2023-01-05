export default {
  name: 'blogs',
  title: 'Blogs',
  type: 'document',
  fields: [
    {
      name: 'coverimage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: 'images',
    //   title: 'Images',
    //   type: 'array',
    //   of: [{type: 'image'}],
    // },
    {
      name: 'title',
      title: 'title',
      type: 'string',
    },
    {
      name: 'Slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 50,
        minLength: 3,
      },
    },
    {
      name: 'publishedon',
      title: 'Published On',
      type: 'datetime',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
}
