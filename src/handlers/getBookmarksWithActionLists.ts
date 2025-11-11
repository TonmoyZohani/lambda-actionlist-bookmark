import { BookmarkService } from "../services/bookmark.service";
import { ActionListService } from "../services/actionList.service";

const bookmarkService = new BookmarkService();
const actionListService = new ActionListService();

export const handler = async (event: { queryStringParameters: any }) => {
  const { userId, boardId } = event.queryStringParameters;

  // Getting bookmarks
  const bookmarks = await bookmarkService.getBookmarksByUserAndBoard(
    userId,
    boardId
  );

  // Storing actionListIds
  const actionListIds = bookmarks.map((bookmark) => bookmark.actionlistid);

  // Getting action lists
  const actionLists = await actionListService.getActionListsByIds(
    actionListIds
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      userId,
      boardId,
      bookmarks,
      actionLists,
    }),
  };
};
