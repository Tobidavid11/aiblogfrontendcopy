import React from "react";
import { Card } from "../ui/card";

const UserTotalBlog = () => {
  return (
    <div>
      <Card>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Card className="rounded-lg bg-muted p-4 text-center hover:bg-muted/80">
            <div className="text-xl font-bold">120k</div>
            <div className="text-sm text-muted-foreground">Posts Created</div>
          </Card>
          <Card className="rounded-lg bg-muted p-4 text-center hover:bg-muted/80">
            <div className="text-xl font-bold">850</div>
            <div className="text-sm text-muted-foreground">Jobs Completed</div>
          </Card>
          <Card className="rounded-lg bg-muted p-4 text-center hover:bg-muted/80">
            <div className="text-xl font-bold">3,200ETH</div>
            <div className="text-sm text-muted-foreground">Earnings</div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default UserTotalBlog;
