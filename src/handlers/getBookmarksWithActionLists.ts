import { BookmarkService } from "../services/bookmark.service";
import { ActionListService } from "../services/actionList.service";

const bookmarkService = new BookmarkService();
const actionListService = new ActionListService();

export const handler = async (event: { queryStringParameters: any }) => {
  const { userId, boardId } = event.queryStringParameters;

  // Step 1: Get bookmarks
  const bookmarks = await bookmarkService.getBookmarksByUserAndBoard(
    userId,
    boardId
  );

  // Step 2: Extract actionListIds
  const actionListIds = bookmarks.map((bookmark) => bookmark.actionlistid); 

  // Step 3: Get action lists
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
