
# Facebook Graph API Integration

This project provides a Node.js backend implementation to interact with the Facebook Graph API, utilizing Express.js and Axios. It enables fetching personal and page information, managing ads posts, reading inbox messages, and interacting with Instagram media related to a specific Facebook Page.

## Features

- Fetch personal profile and page information
- Retrieve ad posts from a Facebook Page
- Access and manage the inbox of a Facebook Page
- Read and post messages in conversations
- Fetch Instagram account ID linked with the Facebook Page
- Read media posted on Instagram
- Fetch insights for Instagram Media Objects

## Prerequisites

- Node.js
- npm or Yarn
- Access to Facebook Developer Account
- A Facebook Page and its associated Instagram account

## Setup

1. **Clone the repository**

    ```
    git clone https://github.com/Rex-Arnab/facebook_sample_app.git
    cd facebook_sample_app
    ```
    or if you use ssh
    ```
    git clone git@github.com:Rex-Arnab/facebook_sample_app.git
    cd facebook_sample_app
    ```

2. **Install dependencies**

    ```
    npm install
    ```

    or if you use Yarn,

    ```
    yarn install
    ```

3. **Environment Variables**

    Create a `.env` file in the root directory and add the following variables:
    ```
    ACCESS_TOKEN=<Your_Facebook_Graph_API_Access_Token>
    PAGE_ID=<Your_Facebook_Page_ID>
    INSTA_ID=<Your_Instagram_Account_ID>
    WEBHOOK_VERIFY_TOKEN=<Your_Webhook_Verify_Token>|<ACCESS_TOKEN>
    ```

4. **Start the server**

    ```
    npm start
    ```

    or if you use Yarn,

    ```
    yarn start
    ```

## Usage

The server exposes several endpoints for interacting with the Facebook Graph API:

- `GET /me` - Fetches basic profile information of the user.
- `GET /page_info` - Fetches information about the Facebook Page.
- `GET /ad_posts` - Retrieves ad posts from the Page.
- `GET /get_inbox_list` - Fetches the inbox of the Page.
- `GET /read_message` - Reads messages from a conversation.
- `POST /read_message/:conversationId` - Posts a message to a conversation.
- `GET /insta_account_id` - Fetches the Instagram account ID linked to the Facebook Page.
- `GET /read_media` - Reads media posted on Instagram.
- `GET /insight/:media_object_id` - Fetches insights for an Instagram Media Object.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License

Distributed under the MIT License. See `LICENSE` for more information.
