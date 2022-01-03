import A from "components/A";

export default function LeftRail({ linkPrefix }: { linkPrefix: string; }) {
  return (
    <div id="left-rail">
      <div>
        <input type="text" id="search" placeholder="search" />
      </div>

      <h2>Categories</h2>

      <ul>
        <li><A to={`${linkPrefix}feedback/all`}>All Feedback</A></li>
        <li><A to={`${linkPrefix}feedback/mine`}>Your Feedback</A></li>
      </ul>
    </div>
  );
}
