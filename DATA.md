# Data Structure
Data gets formated into a JSON file to be used in the game. It will look similar to the following:

```json
{
  "story_meta": {
    "author": "{{ author name }}",
    "title": "{{ story title }}",
    "description": "{{ story description }}",
    "cover_img": "{{ url for cover img }}",
    "date": "{{ publish date }}"
  },
  "story": [
    {
      "id": 0,
      "dialoge": "{{ nexus dialoge }}",
      "bkgrd_img": "{{ url for background img }}",
      "foregrd_img": "{{ url for character or foreground image}}",
      "choices": [
        {
          "text": "Continue...",
          "result_id": 1
        }
      ]
    }, {
      "id": 1,
      "dialoge": "{{ nexus dialoge }}",
      "bkgrd_img": "{{ url for background img }}",
      "foregrd_img": "{{ url for character or foreground image}}",
      "choices": [
        {
          "text": "{{ choice text }}",
          "result_id": 2
        }, {
          "text": "{{ choice text }}",
          "result_id": 3
        }
      ]
    }, {
      "id": 2,
      "dialoge": "{{ nexus dialoge }}",
      "bkgrd_img": "{{ url for background img }}",
      "foregrd_img": "{{ url for character or foreground image}}",
      "choices": [
        {
          "text": "{{ choice text }}",
          "result_id": 4
        }, {
          "text": "{{ choice text }}",
          "result_id": 5
        }
      ]
    }
  ]
}
```

The data above is a sample. `result_id` matches the id for the story point and can be used to jump to the correct story point in the story array.
