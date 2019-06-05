import React from "react";
import axios from "axios";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Posts from "../components/Posts";

jest.mock("axios");

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Posts component", () => {
  it("tests mock axios get request", async () => {
    const response = {
      data: {
        data: {
          children: [
            {
              data: {
                distinguished: null,
                subreddit_name_prefixed: "r/Pizza",
                subreddit: "Pizza",
                title: "Yummy pizza!",
                id: "123456",
                thumbnail: "http://www.google.com"
              }
            }
          ]
        }
      }
    };
    axios.get.mockResolvedValue(response);
    const wrapper = shallow(
      <Posts location={{search: '?searchTerm=pizza'}} />
    );
    const instance = wrapper.instance();
    await instance.fetchPosts();
    expect(instance.state.posts).toEqual(response.data.data.children);
    // expect(instance.state.prefix).toBe("r/Pizza");
    // expect(instance.state.subreddit).toBe("Pizza");
  });
});
