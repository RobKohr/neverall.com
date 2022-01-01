export default function LeftRail() {
  return (
    <div id="left-rail">
      <div>
        <input type="text" id="search" placeholder="search" />
      </div>

      <h2>Categories</h2>

      <ul>
        <li>All</li>
        <li>
          <ul>
            <li>3d</li>
            <li>2d</li>
            <li>Shaders</li>
            <li>
              Tools
              <ul>
                <li>3d Tools</li>
                <li>2d Tools</li>
              </ul>
            </li>

            <li>Scripts</li>
            <li>Textures &amp; Materials</li>
            <li>Animations</li>
            <li>GUI</li>
            <li>VFX</li>
            <li>Audio</li>
          </ul>
        </li>
      </ul>
      <h2>Members</h2>
      <ul>
        <li>* Members only</li>
        <li>* Non-members only</li>
        <li>* Both</li>
      </ul>
      <h2>Supported versions</h2>
      <ul>
        <li>☑ 4</li>
        <li>☑ 3.4</li>
        <li>☑ 3.3</li>
        <li>☑ 3.2</li>
      </ul>
    </div>
  );
}
