angular.module("SmartBuyfilters", []).filter("searchFilter", () => {
  return (data, searchType, searchText) => {
    if (!searchText) {
      return data;
    }

    let keyword = RegExp(searchText, "i");
    return data.filter((item) => {
      switch (searchType) {
        case "title":
          return keyword.test(item.title);
        case "date":
          return keyword.test(item.date);
        case "category":
          return keyword.test(item.catagories);
          case "launchOn":
            return keyword.test(item.launchOn);
      }
    });
  };
});
