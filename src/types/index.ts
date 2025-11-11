export interface ActionListBookmark {
  id: string;
  actionlistid: string;  
  boardId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActionList {
  id: string;
  action: string;
  actionboardID: string;
  actionListStatus: string;
}